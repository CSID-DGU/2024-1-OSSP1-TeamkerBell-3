from rest_framework import serializers
from .models import Team, ChooseTeam, TeamRole, TeamMate, Schedule, Role, Reason
from user.models import Resume, BasicUser


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields='__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields='__all__'

class ChooseTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChooseTeam
        fields='__all__'

class TeamRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamRole
        fields='__all__'

class TeamMateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMate
        fields='__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields='__all__'

class ReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reason
        fields='__all__'


#팀원 모아모기에서 이력서와 팀원의 role을 합쳐서 전송
class ResumeAndRoleSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    class Meta:
        model = Resume
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}
    
    def get_role(self, obj):
        teammate = TeamMate.objects.filter(resume=obj).first()
        if teammate:
            return teammate.role
        else:
            return None

#팀 관리페이지에서 상호평가나 비판점 작성시 팀원 리스트를 넘겨줌. view함수에서 teammate모델에 isTeam이 true인 유저id를 통해 BasicUser 테이블에 접근
class MemberListSerializer(serializers.ModelSerializer):
    class Meta:
        model= BasicUser
        fields=['id','nickname']


#활동종료에서 id받아오기
class IdSerializer(serializers.ModelSerializer):
    class Meta:
        model= BasicUser
        fields=['id']

#상호평가페이지에서 정보를 받아옴 CombinedSerializer까지 전부 포함
class ScoreTagSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(queryset=BasicUser.objects.all())
    participation = serializers.IntegerField()
    contribution = serializers.IntegerField()
    attitude = serializers.IntegerField()
    tag = serializers.ListField(child=serializers.IntegerField())

class ImprovementSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(queryset=BasicUser.objects.all())
    improvement = serializers.CharField()

class ReviewSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(queryset=BasicUser.objects.all())
    review = serializers.CharField()

class CombinedSerializer(serializers.Serializer):
    score_tags = ScoreTagSerializer(many=True)
    improvements = ImprovementSerializer(many=True)
    review = ReviewSerializer()

#강제퇴출과 중도하차에서 id와 이유 받아오기
class KickAndRunSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reason
        field=['user','reason']