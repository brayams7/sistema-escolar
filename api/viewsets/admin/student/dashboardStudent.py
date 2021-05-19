from api.models import Student, Section, Events, Homework
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.serializers.cycleSchoolSerializer import SchoolCycleSerializer
from api.serializers.eventsSerializer import EventsSerializer
from api.serializers.asignationSerializerStudent import CoursesStudentListSerializer
from api.serializers.teachers.homeworks_serializer import HomeworkListSerializer
from api.serializers.levels import LevelSerializer
import json
from django.shortcuts import get_object_or_404
import datetime
from rest_framework.decorators import action

class DashboardStudentViewSet(viewsets.ModelViewSet):

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
    def getEvents(self, request, *args, **kwargs):
        eventos = Events.objects.filter(date__gte = datetime.datetime.now())[:10]

        page = self.paginate_queryset(eventos)
        if page is not None:
            serializer = EventsSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = EventsSerializer(asignaciones, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def traerTareasProximar(self, request, *args, **kwargs):
        student = request.user.profile.student
        tareas = Homework.objects.filter(state=True, asignation__asignation_student__id = student.id).order_by('delivery_date')[:7]

        page = self.paginate_queryset(tareas)
        if page is not None:
            serializer = HomeworkListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = HomeworkListSerializer(tareas, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def cursosAsignados(self, request, *args, **kwargs):
        #devuelve todos los cursos pertenecientes a un estudiante
        user = request.user.profile.student
        asignaciones = user.asignation_student.filter(state = True)
        queryset = self.filter_queryset(asignaciones)

        page = self.paginate_queryset(asignaciones)
        if page is not None:
            serializer = CoursesStudentListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CoursesStudentListSerializer(asignaciones, many=True)
        return Response(serializer.data)

    
