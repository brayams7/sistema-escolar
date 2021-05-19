from api.models import Student, Section, Events, Homework, Asignation, HomeworkStudent
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
from api.serializers.asignationSerializer import AsignationListSerializer, TotalTareasPendientesPorCursoSerializer
from api.serializers.levels import LevelSerializer
import json
from django.shortcuts import get_object_or_404
import datetime
from rest_framework.decorators import action
from django.db.models import Count, Q

class DashboardTeacherViewSet(viewsets.ModelViewSet):

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
    def TotalTareasPendientesCalificarPorCurso(self, request, *args, **kwargs):
        teacher = request.user.profile.teacher
        
        tareas = teacher.asignation_set.filter(state = True).annotate(pendientes_calificar = Count('asignations_homework__homeworkStudent_homework__id', filter=Q(asignations_homework__homeworkStudent_homework__note=None)))
        page = self.paginate_queryset(tareas)
        if page is not None:
            serializer = TotalTareasPendientesPorCursoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TotalTareasPendientesPorCursoSerializer(tareas, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def TotalTareasPendientesCalificar(self, request, *args, **kwargs):
        teacher = request.user.profile.teacher
        total = HomeworkStudent.objects.filter(note = None, homework__asignation__teacher__id = teacher.id).count()
        #asignaciones = teacher.asignation_set.filter(state=True).values_list('id')
        #total = HomeworkStudent.objects.filter(note = None, homework__asignation_id__in = asignaciones).count()
        return Response({'total_tareas_pendientes': str(total)}, status = status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def cursosAsignados(self, request, *args, **kwargs):
        #devuelve todos los cursos pertenecientes a un catedrático
        teacher = request.user.profile.teacher
        asignaciones = Asignation.objects.filter(state = True, teacher=teacher).order_by('grade')
        queryset = self.filter_queryset(asignaciones)

        page = self.paginate_queryset(asignaciones)
        if page is not None:
            serializer = AsignationListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = AsignationListSerializer(asignaciones, many=True)
        return Response(serializer.data)

    
