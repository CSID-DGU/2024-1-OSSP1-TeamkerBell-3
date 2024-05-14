# user/urls.py
from django.contrib import admin
from django.urls import path
from .views import createComp, getComps


urlpatterns = [

    path('', getComps),
    path('compregister', createComp),

]
