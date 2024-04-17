from rest_framework import serializers
from .models import BasicUser

# serializer.py
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model= BasicUser
        fields='__all__'
        # ("id","name","tel")
