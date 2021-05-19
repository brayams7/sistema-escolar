from rest_framework import serializers
from api.models import Section

class SectionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        exclude = ['created','modified']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        exclude = ['created','modified','state']