from rest_framework import serializers
from .models import BasicUser, Resume, Tag, Rude, Bookmark
from comp.models import Comp


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

