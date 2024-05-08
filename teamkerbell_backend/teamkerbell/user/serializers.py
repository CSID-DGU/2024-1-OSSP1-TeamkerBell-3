from rest_framework import serializers
from .models import BasicUser, Resume, Tag


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


