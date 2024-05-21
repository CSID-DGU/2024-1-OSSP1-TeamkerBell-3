# user/urls.py
from django.contrib import admin
from django.urls import path

from .views import createUser, detailResume, getUserForId, manageResume,getCompLiked, compLike, getMyAchievement, loginView, logoutView

urlpatterns = [
    path('register', createUser),
    path('login', loginView),
    path('logout', logoutView),
    path('<int:user_id>/mypage/', getUserForId),
    path('<int:user_id>/mypage/resumes', manageResume),
    path('<int:user_id>/mypage/resume/<int:resume_id>', detailResume),
    path('<int:user_id>/mypage/compLiked', getCompLiked),
    path('<int:user_id>/compLike/<int:comp_id>', compLike),
    path('<int:user_id>/mypage/myachievements', getMyAchievement),
]
    
