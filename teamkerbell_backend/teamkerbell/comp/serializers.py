from rest_framework import serializers
from .models import Comp, CompReview, RandomMatching


class CompSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comp
        fields='__all__'

class CompReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model= CompReview
        fields='__all__'

class RandomMatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model= RandomMatching
        fields='__all__'