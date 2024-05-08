# user/urls.py
from django.contrib import admin
from django.urls import path

from .views import createUser, detailResume, getUserForId, manageResume

urlpatterns = [
    path('register', createUser),
    path('<int:user_id>/mypage/', getUserForId),
    path('<int:user_id>/mypage/resume', manageResume),
    path('<int:user_id>/mypage/resume/<int:resume_id>', detailResume),

]
    
