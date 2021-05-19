from api.models import Homework, Asignation, HomeworkStudent
from rest_framework import viewsets
from django.core.files import File
from api.serializers.teachers.homeworks_serializer import HomeworkSerializer, HomeworkListSerializer, RetrieveHomeworkSerializer
from api.serializers.administration.studentHomeworkSerializer import HomeworkStudentSerializer, ListHomeworkStudentSerializer, RetrieveHomeworkStudentSerializer, HomeworkNoteStudentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
import json
from django.shortcuts import get_object_or_404
from rest_framework import generics
import datetime
from django.db.models import F, Sum
from rest_framework.decorators import action
from decimal import Decimal

class HomeworkViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("name","asignation__course__name")
    
    def get_serializer_class(self):
        if self.action == 'create':
            return HomeworkSerializer
        elif self.action == 'update':
            return RetrieveHomeworkSerializer
        else:
            return HomeworkListSerializer
    
    def get_queryset(self):
        return Homework.objects.filter(state = True)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    def retrieve(self, request, *args, **kwargs):
        #materiales asignados a esta asignacion

        id_asignation = kwargs.get('pk')
        asignation = get_object_or_404(Asignation, id = id_asignation)
        tareas = asignation.asignations_homework.filter(state = True)
        queryset = self.filter_queryset(tareas)
        page = self.paginate_queryset(tareas)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(tareas, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request_data = request.data
        field = request_data.get('field')
        data = json.loads(request_data['data'])
        data['asignation'] = int(data.get('asignation'))
        data['note'] = int(data.get('note'))
        date = data.get('delivery_date')
        posicion = date.find('T')
        data['delivery_date'] = date[:posicion]
        print(data['delivery_date'])
        data.pop('field')
        serializer = self.get_serializer(data = data)
        if serializer.is_valid():
            asignation = get_object_or_404(Asignation, id = data.get('asignation'))
            total_nota = asignation.asignations_homework.filter(state = True).aggregate(suma = Sum('note') + data.get('note'))
            total_nota = total_nota['suma']
            print(total_nota)
            if total_nota == None:
                 total_nota = data.get('note')
            
            if total_nota <= 100:
                if not field:
                    serializer.save()
                    return Response({'creado':'Se ha creado correctamente'},
                        status=status.HTTP_201_CREATED
                    )
                else:
                    Homework.objects.create(
                        asignation_id = data.get('asignation'),
                        name = data.get('name'),
                        description = data.get('description'),
                        field = File(field),
                        delivery_date = data.get('delivery_date'),
                        delivery_time = data.get('delivery_time'),
                        note = data.get('note') 
                    )
                    return Response(
                        {'creado':'Se ha creado correctamente'},
                        status=status.HTTP_201_CREATED
                    )
            else:
                return Response(
                    {'error': 'La nota asignada debe ser un valor menor'},
                    status = status.HTTP_400_BAD_REQUEST
               )
                    
        else:
            return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

    def update(self, request, pk=None):
        try:
            data = request.data
            field = data.get("field")
            print(field)
            data = json.loads(data["data"])
            tarea = get_object_or_404(Homework, id=pk)
            serializer = self.get_serializer(tarea, data=data)
            if serializer.is_valid():
                if tarea:
                    if tarea.field is not None and field is not None:
                        material.field.delete()
                    
                    instance = serializer.save()
                    
                    if field is not None:
                        instance.field = File(field)
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

class RetrieveHomeworkAPIView(generics.RetrieveAPIView):
    #trae una tarea para modifiacar o eliminar
    serializer_class = HomeworkListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Asignation.objects.filter(state=True)

    def get_object(self):
        id_asignation = self.kwargs.get('id_asignation')
        id_homework = self.kwargs.get('id_homework')

        asignation = self.get_queryset().filter(id = id_asignation).first()
        homework = asignation.asignations_homework.get(id = id_homework)
        print('hola', homework.field)
        return homework
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CalificationHomework(viewsets.ModelViewSet):

    def get_queryset(self):
        return HomeworkStudent.objects.filter(state=True)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ListHomeworkStudentSerializer

        elif self.action == 'retrieve':
            return RetrieveHomeworkStudentSerializer

        elif self.action == 'update':
            return HomeworkNoteStudentSerializer
        else:
            return HomeworkStudentSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def listar_tareas_entregadas(self, request, *args, **kwargs):
        id_homework = request.query_params.get('id_homework')
        homework = get_object_or_404(Homework, id = id_homework)
        tareas_entregadas = homework.homeworkStudent_homework.filter(state=True)

        page = self.paginate_queryset(tareas_entregadas)
        if page is not None:
            serializer = ListHomeworkStudentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ListHomeworkStudentSerializer(tareas_entregadas, many=True)
        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):

        homeworkStudent = self.get_object()
        data = request.data
        nota = {'note':data.get('note')}
        print(data)
        serializer = self.get_serializer(data = nota)
        if serializer.is_valid():
            note = Decimal(data.get("note"))
            homeworkStudent.note = note 
            homeworkStudent.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
            