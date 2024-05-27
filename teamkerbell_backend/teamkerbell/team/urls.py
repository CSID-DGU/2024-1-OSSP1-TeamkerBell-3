# team/urls.py
from django.contrib import admin
from django.urls import path

from .views import teamCompInfo, teamScheduleAndCommit, teamMateList, reportUser,mutualReview, KickUser, RunUser, manageTeam, teamEndVote, plusMatching, allTeamList

urlpatterns = [
    
    path('<int:team_id>/progress/', teamScheduleAndCommit),
    path('<int:team_id>/members/', teamMateList),
    path('<int:team_id>/report/', reportUser),
    path('<int:team_id>/evaluation/end/', mutualReview),
    path('<int:team_id>/teamManager/', manageTeam),
    path('<int:team_id>/voteEnd/', teamEndVote),
    path('<int:team_id>/plusMatching',plusMatching),
    path('<int:team_id>/kick', KickUser),
    path('<int:team_id>/run', RunUser),
    path('<int:team_id>/compinfo', teamCompInfo),
    path('teamList', allTeamList),
]
