from rest_framework import viewsets
from api.models import Grade
from api.serializers.grade import GradeListSerializer, GradeSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.settings import api_settings
from api.permissions import IsAdmin

class GradeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsAdmin)

    def get_serializer_class(self):
        if self.action == 'create':
            return GradeSerializer
        else:
            return GradeListSerializer
    
    def get_queryset(self):
        return Grade.objects.filter(state=True)
    
        