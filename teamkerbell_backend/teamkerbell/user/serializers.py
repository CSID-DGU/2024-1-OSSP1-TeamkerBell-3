from rest_framework import serializers
from .models import BasicUser, Resume, Tag, Rude, Bookmark, LoginUser
from comp.models import Comp
from team.models import Team, TeamMate

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Resume
        fields='__all__'
        extra_kwargs = {'user': {'read_only': True}}

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= BasicUser
        fields='__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model= Tag
        fields='__all__'

class RudeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rude
        fields='__all__'

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bookmark
        exclude = ['user', 'comp']

class CompListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comp
        fields=['id','name','img','endDate','context']

class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicUser
        fields = ['nickname', 'phone', 'email', 'password']

class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginUser
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = LoginUser.objects.create_user(email=validated_data['email'], password=validated_data['password'])
        return user

class TeamAndCompNameSerializer(serializers.ModelSerializer):
    compTitle = serializers.SerializerMethodField()
    class Meta:
        model = Team
        fields = '__all__'

    
    def get_compTitle(self, obj):
        comp = Comp.objects.filter(id=obj.comp_id).first()
        if comp:
            return comp.name
        else:
            return None
        
class ResumeAndRoleAndTagSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    tag = serializers.SerializerMethodField()
    class Meta:
        model = Resume
        fields = '__all__'

    def get_role(self, obj):
        team = self.context.get('team')
        teammate = TeamMate.objects.filter(resume=obj, team=team).first()
        if teammate:
            return teammate.role
        else:
            return None
    def get_tag(self, obj):
        user = obj.user
        top_tags = Tag.objects.filter(user=user).order_by('-count')[:4]
        return [tag.num for tag in top_tags]

class AcceptSerializer(serializers.Serializer):
    accept = serializers.BooleanField()