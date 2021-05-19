from rest_framework import serializers
from api.models import Course

class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ['created','modified']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ['created','modified','state']