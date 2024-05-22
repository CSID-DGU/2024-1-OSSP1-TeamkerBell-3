# user/urls.py
from django.contrib import admin
from django.urls import path

from .views import resumeAccept, resumeList, createUser, detailResume, getUserForId, manageResume,getCompLiked, compLike, getMyAchievement, loginView, logoutView, myTeamList, teamEndVoteInMyPage, breakTeam, cancelJoin, makeTeam

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
    path('<int:user_id>/mypage/teams', myTeamList),
    path('<int:user_id>/mypage/team/<int:team_id>/voteend', teamEndVoteInMyPage),
    path('<int:user_id>/mypage/team/<int:team_id>/breakteam', breakTeam),
    path('<int:user_id>/mypage/team/<int:team_id>/cancel', cancelJoin),
    path('<int:user_id>/mypage/team/<int:team_id>/maketeam', makeTeam),
    path('<int:user_id>/mypage/team/<int:team_id>/resume', resumeList),
    path('<int:user_id>/mypage/team/<int:team_id>/resume/<int:resume_id>', resumeAccept),
]
    
