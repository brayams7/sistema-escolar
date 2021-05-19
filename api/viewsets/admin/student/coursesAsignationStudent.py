from rest_framework import viewsets
from api.models import Course, AsignationStudent
from api.serializers.asignationSerializerStudent import CoursesStudentListSerializer, RetrieveCoursesStudentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
import datetime
from django.db.models import Count

class CourseStudentViewSet(viewsets.ModelViewSet):

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("student__profile__user__first_name",)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CoursesStudentListSerializer
        elif self.action == 'retrieve':
            return RetrieveCoursesStudentSerializer
            
    def get_queryset(self):
        return AsignationStudent.objects.filter(state=True)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
        
    def list(self, request, *args, **kwargs):
        #devuelve todos los cursos pertenecientes a un estudiante
        user = request.user.profile.student
        asignaciones = user.asignation_student.filter(state = True)
        queryset = self.filter_queryset(asignaciones)

        page = self.paginate_queryset(asignaciones)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(asignaciones, many=True)
        return Response(serializer.data)
    
        