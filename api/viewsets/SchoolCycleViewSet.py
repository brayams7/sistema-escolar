from rest_framework import viewsets
from api.models import SchoolCycle
from api.serializers.cycleSchoolSerializer import SchoolCycleListSerializer, SchoolCycleSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.permissions import IsAdmin

class SchoolCycleViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("anio",)
    permission_classes = (IsAuthenticated, IsAdmin)

    def get_serializer_class(self):
        if self.action == 'create':
            return SchoolCycleSerializer
        else:
            return SchoolCycleListSerializer
    
    def get_queryset(self):
        return SchoolCycle.objects.filter(state=True)

        