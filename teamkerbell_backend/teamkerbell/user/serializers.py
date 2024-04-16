from rest_framework import serializers
from .models import User

# serializer.py
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields='__all__'
        # ("id","name","tel")
