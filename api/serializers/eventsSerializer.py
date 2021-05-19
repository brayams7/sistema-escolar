from rest_framework import serializers
from api.models import Events

class EventsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        exclude = ['created','modified']

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        exclude = ['created','modified','state']