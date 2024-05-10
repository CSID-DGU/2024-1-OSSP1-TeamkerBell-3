from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .models import Team, ChooseTeam, TeamRole, TeamMate, Schedule, Role, Reason
from .serializers import ScheduleSerializer
# Create your views here.





