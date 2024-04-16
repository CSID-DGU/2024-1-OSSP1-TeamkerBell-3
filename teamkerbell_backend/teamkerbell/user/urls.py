# user/urls.py
from django.contrib import admin
from django.urls import path

from .views import getUser, getUserForId

urlpatterns = [
    path('', getUser),
    path('<int:id>/', getUserForId)
]
    
