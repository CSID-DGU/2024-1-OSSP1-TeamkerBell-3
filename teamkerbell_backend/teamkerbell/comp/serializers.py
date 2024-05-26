from rest_framework import serializers
from .models import Comp, CompReview, RandomMatching
from team.models import ChooseTeam, Team, TeamRole, TeamMate
from user.models import BasicUser, Resume
class CompSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comp
        fields='__all__'
    def validate_startDate(self, value):
        return value.split('T')[0]

    def validate_endDate(self, value):
        return value.split('T')[0]

class CompReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model= CompReview
        fields='__all__'

class RandomMatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model= RandomMatching
        fields='__all__'

class TeamInfoAndChooseTeamInfoAndTeamRoleSerializer(serializers.ModelSerializer):
    leader=serializers.SerializerMethodField()
    recruitNum=serializers.SerializerMethodField()
    role=serializers.SerializerMethodField()
    createdAt=serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    dong =serializers.SerializerMethodField()
    class Meta:
        model=ChooseTeam
        fields='__all__'

    def get_leader(self,obj):
        team=Team.objects.filter(id=obj.team.id).first()
        if team:
            return team.leader.nickname
        else:
            return None
    def get_recruitNum(self,obj):
        team=Team.objects.filter(id=obj.team.id).first()
        if team:
            return team.recruitNum
        else:
            return None
    def get_role(self,obj):
        teamroles=TeamRole.objects.filter(team=obj.team).values_list('role', flat=True)
        if teamroles:
            return list(teamroles)
        else:
            return None
    def get_createdAt(self,obj):
        team=Team.objects.filter(id=obj.team.id).first()
        if team:
            return team.startDate
        else:
            return None
    def get_city(self,obj):
        team=Team.objects.filter(id=obj.team.id).first()
        teammate = TeamMate.objects.filter(team=team, user=team.leader).first()
        resume = Resume.objects.filter(id=teammate.resume.id).first()
        if resume:
            return resume.city
        else:
            return None
    def get_dong(self, obj):
        team=Team.objects.filter(id=obj.team.id).first()
        teammate = TeamMate.objects.filter(team=team, user=team.leader).first()
        resume = Resume.objects.filter(id=teammate.resume.id).first()
        if resume:
            return resume.dong
        else:
            return None
        
class makeTeamSerializer(serializers.Serializer):
    recruitRole = serializers.ListField(
        child=serializers.CharField(max_length=50)
    )
    recruitNumber = serializers.ListField(
        child=serializers.IntegerField()
    )
    projectStartDate = serializers.CharField(max_length=50)
    name = serializers.CharField(max_length=255)
    intro = serializers.CharField(max_length=500)
    method = serializers.CharField(max_length=50)
    language = serializers.CharField(max_length=50)
    qualification = serializers.CharField(max_length=500)
    resumeId = serializers.PrimaryKeyRelatedField(queryset=Resume.objects.all())
    class Meta:
        fields = [
            'recruitRole', 
            'recruitNumber', 
            'projectStartDate', 
            'name',
            'intro', 
            'method', 
            'language', 
            'qualification', 
            'resumeId'
        ]
        
class RandomMatchingApplySerializer(serializers.ModelSerializer):
    class Meta:
        model=RandomMatching
        fields=['user', 'role','city','dong','isLeader','recruitNum']

class applyResumeSerializer(serializers.Serializer):
    resumeId=serializers.PrimaryKeyRelatedField(queryset=Resume.objects.all())
    role=serializers.CharField(max_length=50)
