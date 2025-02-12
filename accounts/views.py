from django.shortcuts import render
import base64
from django.core.files.base import ContentFile
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db import IntegrityError
from accounts.models import UserImages
import face_recognition
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password


@csrf_exempt

def register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        face_image_data = request.POST.get('face_image')

        if not username:
            return JsonResponse({'status': 'error', 'message': 'Username is required'})

        if not password:
            return JsonResponse({'status': 'error', 'message': 'Password is required'})

        if not face_image_data:
            return JsonResponse({'status': 'error', 'message': 'Face image is required'})

        # Decode face image
        try:
            face_image_data = face_image_data.split(",")[1]
            face_image = ContentFile(base64.b64decode(face_image_data), name=f'{username}_.jpg')
        except (IndexError, ValueError):
            return JsonResponse({'status': 'error', 'message': 'Invalid face image format'})

        # Create user with password hashing
        try:
            hashed_password = make_password(password)  # Hash the password before saving
            user = User.objects.create(username=username, password=hashed_password)
        except IntegrityError:
            return JsonResponse({'status': 'error', 'message': 'Username already taken'})

        # Save user's face image
        UserImages.objects.create(user=user, face_image=face_image)
        return JsonResponse({'status': 'success'})

    return render(request, 'register.html')


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        face_image_data = request.POST.get('face_image')

        if not username or not password or not face_image_data:
            return JsonResponse({'status': 'error', 'message': 'Username, password, and face image are required'})

        # Authenticate user by username and password
        user = authenticate(username=username, password=password)
        if not user:
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password'})

        # Decode the uploaded face image
        try:
            face_image_data = face_image_data.split(",")[1]  # Remove base64 prefix
            uploaded_image = ContentFile(base64.b64decode(face_image_data), name=f'{username}_uploaded.jpg')
        except (IndexError, ValueError):
            return JsonResponse({'status': 'error', 'message': 'Invalid face image format'})

        # Load and encode the uploaded image
        uploaded_face_image = face_recognition.load_image_file(uploaded_image)
        uploaded_face_encodings = face_recognition.face_encodings(uploaded_face_image)

        if not uploaded_face_encodings:
            return JsonResponse({'status': 'error', 'message': 'No face detected in the uploaded image'})

        uploaded_face_encoding = uploaded_face_encodings[0]  # Get the first encoding

        # Retrieve the user's stored face image and encoding
        user_image = UserImages.objects.filter(user=user).last()
        if not user_image:
            return JsonResponse({'status': 'error', 'message': 'User face image not found'})

        stored_face_image = face_recognition.load_image_file(user_image.face_image.path)
        stored_face_encodings = face_recognition.face_encodings(stored_face_image)

        if not stored_face_encodings:
            return JsonResponse({'status': 'error', 'message': 'No face detected in the stored image'})

        stored_face_encoding = stored_face_encodings[0]  # Get the first encoding

        # Compare the uploaded face with the stored face
        match = face_recognition.compare_faces([stored_face_encoding], uploaded_face_encoding)

        if match[0]:
            # Login successful
            login(request, user)  # Log the user in
            return JsonResponse({'status': 'success', 'message': 'Login successful'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Face does not match'})

    return render(request, 'login.html')
