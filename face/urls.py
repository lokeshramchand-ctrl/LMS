from accounts.views import register , login_user
from django.contrib import admin
from django.urls import path

from courses import views

urlpatterns = [
    path('register/', register),
    path('login/', login_user),
    path('admin/', admin.site.urls),
    path('courses/', views.course_list, name='course_list'),
    path('courses/<int:course_id>/', views.course_detail, name='course_detail'),
    path('courses/<int:course_id>/enroll/', views.enroll_course, name='enroll_course'),
    path('courses/<int:course_id>/assignments/', views.assignment_list, name='assignment_list'),
    path('assignments/<int:assignment_id>/submit/', views.submit_assignment, name='submit_assignment'),
]
