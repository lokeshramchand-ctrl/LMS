from django.db import models
from django.contrib.auth.models import User

class Meeting(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)  # Teacher who starts the meeting
    meeting_id = models.CharField(max_length=255, unique=True)
    meeting_link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Meeting {self.meeting_id} by {self.host}"
