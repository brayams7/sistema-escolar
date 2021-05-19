from rest_framework import viewsets
from api.models import Level
from api.serializers.levels import LevelListSerializer, LevelSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.settings import api_settings
from api.permissions import IsAdmin

class LevelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsAdmin)

    def get_serializer_class(self):
        if self.action == 'create':
            return LevelSerializer
        else:
            return LevelListSerializer
    
    def get_queryset(self):
        return Level.objects.filter(state=True)

        