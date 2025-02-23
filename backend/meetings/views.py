import uuid
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Meeting

@login_required
def create_meeting(request):
    user = request.user  # Get the logged-in user
    meeting_id = str(uuid.uuid4())[:8]  # Generate a random 8-character meeting ID
    meeting_link = f"https://meet.jit.si/{meeting_id}"  # Jitsi Meet link

    # Save the meeting to the database
    meeting = Meeting.objects.create(host=user, meeting_id=meeting_id, meeting_link=meeting_link)

    return JsonResponse({"meeting_id": meeting_id, "meeting_link": meeting_link})
