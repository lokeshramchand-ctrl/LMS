import uuid
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Meeting

@login_required
def create_meeting(request):
    user = request.user  
    meeting_id = str(uuid.uuid4())[:8]  # Generates a short unique ID
    meeting_link = f"https://meet.jit.si/{meeting_id}"

    # Save the meeting in the database
    meeting = Meeting.objects.create(host=user, meeting_id=meeting_id, meeting_link=meeting_link)

    # ✅ Render an HTML template instead of returning JSON
    return render(request, 'meeting_page.html', {'meeting_id': meeting_id, 'meeting_link': meeting_link})
