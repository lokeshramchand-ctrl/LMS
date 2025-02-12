from accounts.views import register , login_user
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('register/', register),
    path('login/', login_user),
    path('admin/', admin.site.urls),
    path('courses/',include('courses.urls'))
]
