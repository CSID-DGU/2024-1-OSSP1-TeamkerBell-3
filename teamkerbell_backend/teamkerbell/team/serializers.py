from rest_framework import serializers
from .models import Team, ChooseTeam, TeamRole, TeamMate, Schedule,  OutReason, PreviousWinning
from user.models import Resume, BasicUser, Rude


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields='__all__'

class TeamforMainSerializer(serializers.ModelSerializer):
    roleList = serializers.SerializerMethodField()
    name =serializers.SerializerMethodField()
    language = serializers.SerializerMethodField()
    writer=serializers.SerializerMethodField()
    writerImg=serializers.SerializerMethodField()
    class Meta:
        model = Team
        fields='__all__'
    def get_roleList(self, obj):
        teamroles = TeamRole.objects.filter(team=obj).values_list('role', flat=True)
        return list(teamroles) if teamroles else None

    def get_name(self, obj):
        chooseteam = ChooseTeam.objects.filter(team=obj).first()
        return chooseteam.name if chooseteam else None

    def get_language(self, obj):
        chooseteam = ChooseTeam.objects.filter(team=obj).first()
        return chooseteam.language if chooseteam else None
    
    def get_writer(self, obj):
        user = BasicUser.objects.filter(id=obj.leader.id).first()
        return user.nickname if user else None
    
    def get_writerImg(self, obj):
        user = BasicUser.objects.filter(id=obj.leader.id).first()
        return user.img if user else None
        
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


class ReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutReason
        fields='__all__'

class ScheduleAndCommitSerializer(serializers.Serializer):
    scheduleList = ScheduleSerializer(many=True, required=False)
    repository = serializers.CharField(required=False)

#팀원 모아모기에서 이력서와 팀원의 role을 합쳐서 전송
class ResumeAndRoleAndImgSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    img=serializers.SerializerMethodField()
    score=serializers.SerializerMethodField()
    class Meta:
        model = Resume
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}

    def get_score(self, obj):
        user = obj.user
        return user.score
    
    def get_role(self, obj):
        team = self.context.get('team')
        teammate = TeamMate.objects.filter(resume=obj, team=team).first()
        if teammate:
            return teammate.role
        else:
            return None
    def get_img(self, obj):
        user=BasicUser.objects.filter(id=obj.user.id).first()
        if user:
            return user.img
        else:
            return None

#팀 관리페이지에서 상호평가나 비판점 작성시 팀원 리스트를 넘겨줌. view함수에서 teammate모델에 isTeam이 true인 유저id를 통해 BasicUser 테이블에 접근
class MemberListSerializer(serializers.ModelSerializer):
    class Meta:
        model= BasicUser
        fields=['id','nickname']


#활동종료에서 id받아오기
class IdSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(queryset=BasicUser.objects.all())

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
    reporter = serializers.PrimaryKeyRelatedField(queryset=BasicUser.objects.all())

class ReviewSerializer(serializers.Serializer):
    review = serializers.CharField()

class CombinedSerializer(serializers.Serializer):
    score_tags = ScoreTagSerializer(many=True)
    improvements = ImprovementSerializer(many=True)
    review = ReviewSerializer()

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rude
        fields=['user','rudeness','reporter']

class PlusMatchingSerializer(serializers.Serializer):
    role = serializers.CharField()
    recruitNum = serializers.IntegerField()

#강제퇴출과 중도하차에서 id와 이유 받아오기
class KickAndRunSerializer(serializers.ModelSerializer):
    class Meta:
        model=OutReason
        fields=['user','reason']

class TeamRoleForApplySerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamRole
        fields=['role','recruitNum','num']

class PreviousWinningSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreviousWinning
        fields=['img','comp','title','interview']
