# user/urls.py
from django.contrib import admin
from django.urls import path
from .views import patchcomp, deletecomp, applyTeam, createRandomTeam, createTeam, createComp, getComps , teamDetails, teamDescriptions, reviewList, CompInfo, createwinner


urlpatterns = [

    path('', getComps),
    path('register', createComp),
    #path('<int:comp_id>/teamList/<int:team_id>/leaderResume',teamDetails),
    path('<int:comp_id>/teamList/<int:team_id>/leaderResume/', teamDetails),
    path('<int:comp_id>/teamList/<int:team_id>/detail/', teamDescriptions),
    path('<int:comp_id>/reviewList/', reviewList),
    path('<int:comp_id>/', CompInfo),
    path('<int:comp_id>/createTeam/<int:user_id>', createTeam),
    path('<int:comp_id>/createRandomTeam/', createRandomTeam),
    path('<int:comp_id>/teamList/<int:team_id>/apply/<int:user_id>', applyTeam),
    path('<int:comp_id>/delete', deletecomp),
    path('<int:comp_id>/patch', patchcomp),
    path('<int:comp_id>/createwinner', createwinner),
]
