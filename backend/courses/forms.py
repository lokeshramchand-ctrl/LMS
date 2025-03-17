from django import forms
from .models import Enrollment, Submission

# Enrollment form
class EnrollmentForm(forms.ModelForm):
    class Meta:
        model = Enrollment
        fields = []  

class SubmissionForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ['submission_file']
