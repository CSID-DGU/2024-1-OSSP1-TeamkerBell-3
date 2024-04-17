# user/urls.py
from django.contrib import admin
from django.urls import path

from .views import createUser, getUserForId

urlpatterns = [
    path('register', createUser),
    path('<int:id>/', getUserForId)
]
    
