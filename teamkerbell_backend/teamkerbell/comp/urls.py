# user/urls.py
from django.contrib import admin
from django.urls import path
from .views import createComp, getComps , teamDetails, teamDescriptions, reviewList, CompInfo


urlpatterns = [

    path('', getComps),
    path('register', createComp),
    #path('<int:comp_id>/teamList/<int:team_id>/leaderResume',teamDetails),
    path('<int:comp_id>/teamList/<int:team_id>/leaderResume/', teamDetails),
    path('<int:comp_id>/teamList/<int:team_id>/detail/', teamDescriptions),
    path('<int:comp_id>/teamList/reviewList/', reviewList),
    path('<int:comp_id>/', CompInfo),
]
