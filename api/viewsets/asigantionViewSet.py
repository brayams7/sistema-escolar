from rest_framework import viewsets
from api.models import Asignation
from django.core.files import File
from api.serializers.asignationSerializer import AsignationListSerializer, AsignationSerializer, RetrieveAsignationSerializer
from api.serializers.teachers.teacher_serializers import ListTeacherSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.models import Teacher
import json
from django.shortcuts import get_object_or_404
from rest_framework import generics
import datetime
from api.permissions import IsAdmin

class AsigantionViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("teacher__profile__user__first_name","teacher__profile__user__last_name")
    permission_classes = (IsAuthenticated, IsAdmin)
    
    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return AsignationSerializer
        elif self.action == 'list':
            return ListTeacherSerializer
        elif self.action == 'retrieve':
            return RetrieveAsignationSerializer
    
    def get_queryset(self):
        if self.action == 'list':
            ids_teacher = Asignation.objects.values_list('teacher_id')
            return Teacher.objects.filter(id__in = ids_teacher, state=True)
        
        anio = datetime.datetime.now().year
        return Asignation.objects.filter(state=True, schoolCycle__anio = anio)


    def create(self, request, *args, **kwargs):
        request_data = request.data
        avatar = request_data.get('avatar')
        data = json.loads(request_data['data'])
        data.pop('avatar')
        print(data)
        serializer = self.get_serializer(data = data)
        if serializer.is_valid():
            if not avatar:
                serializer.save()
                return Response({'creado':'Se ha creado correctamente'},
                    status=status.HTTP_201_CREATED
                )
            else:
                Asignation.objects.create(
                    schoolCycle_id = data.get('schoolCycle'),
                    grade_id = data.get('grade'),
                    section_id = data.get('section'),
                    course_id = data.get('course'),
                    teacher_id = data.get('teacher'),
                    description = data.get('description'),
                    avatar = File(avatar)
                    
                )
                
                return Response(
                    {'creado':'Se ha creado correctamente'},
                    status=status.HTTP_201_CREATED
                )
        else:
            return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

    def update(self, request, pk=None):
        try:
            data = request.data
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            data['schoolCycle'] = data.get('schoolCycle').get('value')
            data['course'] = data.get('course').get('value') 
            data['section'] = data.get('section').get('value') 
            data['grade'] = data.get('grade').get('value') 
            data['teacher'] = data.get('teacher').get('value')

            asignation = get_object_or_404(Asignation, id=pk)
            serializer = self.get_serializer(asignation , data=data)
            if serializer.is_valid():
                if asignation:
                    if asignation.avatar is not None and avatar is not None:
                        asignation.avatar.delete()
                        
                    instance = serializer.save()
                    print(instance)
                    if avatar is not None:
                        instance.avatar = File(avatar)
                    instance.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'error':'el identificador no existe'
                    }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AsignationTeacherListViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("asignation__teacher__profile__user__first_name",)
    serializer_class = AsignationListSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return Teacher.objects.filter(state=True)

    def get_objects(self):
        #devuelve todos los catedráticos
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        id = self.kwargs.get('pk')
        teacher = get_object_or_404(queryset , id=id)
        if teacher:
            anio = datetime.datetime.now().year
            asignaciones = teacher.asignation_set.filter(state=True, schoolCycle__anio = anio).order_by('grade','section')
        #asignaciones pertenecientes a este catedrático
        return asignaciones
    
    #def get(self, request, *args, **kwargs):
    #    return self.retrieve(request, *args, **kwargs)
    def retrieve(self, request, *args, **kwargs):
        asignations = self.filter_queryset(self.get_objects())
        page = self.paginate_queryset(asignations)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(asignations, many=True)
        return Response(serializer.data)