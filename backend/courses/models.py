from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')  # Instructor is a User
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.title

class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    content = models.TextField()  # Can store text, or links to videos/PDFs

    def __str__(self):
        return f"{self.title} - {self.course.title}"

# Enrollment model
class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrollment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} enrolled in {self.course.title}"

# Assignment model
class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField()
    submission_deadline = models.DateTimeField()

    def __str__(self):
        return f"Assignment: {self.title} - {self.course.title}"

# Submission model
class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    submission_file = models.FileField(upload_to='submissions/')  # Directory to store uploaded files
    grade = models.FloatField(null=True, blank=True)  # Grade can be optional initially

    def __str__(self):
        return f"{self.user.username}'s submission for {self.assignment.title}"
