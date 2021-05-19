from rest_framework import serializers
from api.models import Level

class LevelListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        exclude = ['created','modified']

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        exclude = ['created','modified','state']