from rest_framework import viewsets
from api.models import Course, Asignation, Teacher
from api.serializers.asignationSerializer import AsignationListSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
import datetime

class AsigantionListTeacherViewSet(viewsets.ModelViewSet):
    serializer_class = AsignationListSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("name",)
    
    def get_queryset(self):
        return Teacher.objects.filter(state=True)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    def get_objects(self):
        #devuelve todos los catedráticos
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        id = self.kwargs.get('pk')
        teacher = get_object_or_404(Teacher, profile_id = id)
        if teacher:
            anio = datetime.datetime.now().year
            asignations = Asignation.objects.filter(teacher_id = teacher.id, state=True, schoolCycle__anio = anio)
        #asignaciones que le pertenece al catedrático
        return asignations
    
    def retrieve(self, request, *args, **kwargs):
        courses = self.filter_queryset(self.get_objects())
        page = self.paginate_queryset(courses)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data)