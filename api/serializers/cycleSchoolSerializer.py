from rest_framework import serializers
from api.models import SchoolCycle

class SchoolCycleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolCycle
        exclude = ['created','modified']

class SchoolCycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolCycle
        exclude = ['created','modified','state']