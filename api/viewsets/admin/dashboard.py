from api.models import SchoolCycle, Student, Teacher, Profile, Level, Grade, Section
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.serializers.cycleSchoolSerializer import SchoolCycleSerializer
from api.serializers.levels import LevelSerializer
import json
from django.shortcuts import get_object_or_404
import datetime
from rest_framework.decorators import action

class DashboardAdminViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.action == 'create':
            return None
    
    def get_queryset(self):
        return Level.objects.filter(state = True)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def getCycleSchool(self, request, *args, **kwargs):
        anio = datetime.datetime.now().year

        anio = SchoolCycle.objects.get(anio = anio)

        serializer = SchoolCycleSerializer(anio)
        return Response(serializer.data, status = status.HTTP_200_OK)

    
    @action(detail=False, methods=['get'])
    def getTotalUsers(self, request, *args, **kwargs):
        
        total = Profile.objects.count()
        return Response({'total_users': str(total) }, status = status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def getTotalTeachers(self, request, *args, **kwargs):
        
        total = Teacher.objects.count()
        return Response({'total_teachers': str(total) }, status = status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def getTotalStudents(self, request, *args, **kwargs):

        total = Student.objects.count()
        return Response({'total_students': str(total) }, status = status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def getLevels(self, request, *args, **kwargs):
        
        levels = Level.objects.filter(state=True)

        queryset = self.filter_queryset(levels)
        page = self.paginate_queryset(levels)
        if page is not None:
            serializer = LevelSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = LevelSerializer(levels, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def getTotalGrades(self, request, *args, **kwargs):

        total = Grade.objects.count()
        return Response({'total_grade': str(total) }, status = status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def getTotalSections(self, request, *args, **kwargs):
        total = Section.objects.count()
        return Response({'total_section': str(total) }, status = status.HTTP_200_OK)


