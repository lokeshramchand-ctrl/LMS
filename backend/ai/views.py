from django.http import JsonResponse
from django.shortcuts import render
import google.generativeai as genai
from .models import Chat
from django.utils import timezone

# Set up Google Gemini API key
GENAI_API_KEY = "AIzaSyDvGKYoRAJe07LGUZG3_2dZ1_mA7LjRC3A"
genai.configure(api_key=GENAI_API_KEY)

def ask_gemini(message):
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(message, generation_config={"max_output_tokens": 200})
    
    return response.text

# Chatbot view
def chatbot(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        response = ask_gemini(message)

        chat = Chat(message=message, response=response, created_at=timezone.now())
        chat.save()
        return JsonResponse({'message': message, 'response': response})

    chats = Chat.objects.all()
    return render(request, 'chatbot.html', {'chats': chats})
