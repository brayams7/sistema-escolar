from rest_framework import viewsets
from api.models import Section
from api.serializers.secctionSerializer import SectionListSerializer, SectionSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.permissions import IsAdmin

class SectionViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("name",)
    permission_classes = (IsAuthenticated, IsAdmin)

    def get_serializer_class(self):
        if self.action == 'create':
            return SectionSerializer
        else:
            return SectionListSerializer
    
    def get_queryset(self):
        return Section.objects.filter(state=True)
    