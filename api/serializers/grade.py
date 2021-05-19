from rest_framework import serializers
from api.models import Grade

class GradeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        exclude = ['created','modified']

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        exclude = ['created','modified','state']