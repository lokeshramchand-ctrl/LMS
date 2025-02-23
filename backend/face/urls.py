from django.contrib import admin
from django.urls import path,include

from courses import views as course_views
from ai import views as ai_views
from authe import views as authe_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('courses/', course_views.course_list, name='course_list'),
    path('courses/<int:course_id>/', course_views.course_detail, name='course_detail'),
    path('courses/<int:course_id>/enroll/', course_views.enroll_course, name='enroll_course'),
    path('courses/<int:course_id>/assignments/', course_views.assignment_list, name='assignment_list'),
    path('assignments/<int:assignment_id>/submit/', course_views.submit_assignment, name='submit_assignment'),
    path('chat/', ai_views.chatbot, name='chatbot'),  
    path('register/', authe_views.register),
    path('login/', authe_views.login_user),
    path("meetings/", include("meetings.urls")),

  
]
