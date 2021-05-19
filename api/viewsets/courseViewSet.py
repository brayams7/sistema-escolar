from rest_framework import viewsets
from api.models import Course
from api.serializers.courseSerializer import CourseListSerializer, CourseSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.permissions import IsAdmin

class CourseViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("name",)
    permission_classes = (IsAuthenticated, IsAdmin)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CourseSerializer
        else:
            return CourseListSerializer
    
    def get_queryset(self):
        return Course.objects.filter(state=True)
