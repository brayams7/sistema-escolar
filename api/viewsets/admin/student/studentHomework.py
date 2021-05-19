from api.models import Homework, Asignation, HomeworkStudent
from rest_framework import viewsets
from django.core.files import File
from api.serializers.teachers.homeworks_serializer import HomeworkSerializer, HomeworkListSerializer, RetrieveHomeworkSerializer
from api.serializers.administration.studentHomeworkSerializer import HomeworkStudentSerializer

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
import json
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.decorators import action
import datetime
from django.db.models import F, Sum

class HomeworkStudentViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("name","asignation__course__name")
    
    def get_serializer_class(self):
        if self.action == 'create':
            return HomeworkStudentSerializer
        elif self.action == 'retrieve':
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
        id_asignation = kwargs.get('pk')
        asignation = Asignation.objects.filter(id = id_asignation).first()  
        tareas = asignation.asignations_homework.filter(state=True).order_by('delivery_date')
        queryset = self.filter_queryset(tareas)
        page = self.paginate_queryset(tareas)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(tareas, many=True)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        user = request.user.profile.student
        id_asignaciones_estudiante = user.asignation_student.filter(state = True).values_list('asignation_id')  
        tareas = Homework.objects.filter(asignation_id__in = id_asignaciones_estudiante).order_by('delivery_date')
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
        data['homework'] = int(data.get('homework'))
        user = request.user.profile.student
        data['student'] = user.id
        data['delivery_date'] = datetime.datetime.now().strftime("%Y-%m-%d")
        print(data)
        serializer = self.get_serializer(data = data)
        if serializer.is_valid():
            
            mi_tarea = HomeworkStudent.objects.filter(homework_id = data.get('homework'), student_id=user.id).first()
            if mi_tarea:
                if mi_tarea.field is not None and field is not None:
                    mi_tarea.field.delete()

                mi_tarea.delivery_date = data.get("delivery_date")
                mi_tarea.text = data.get("text")

                if field is not None:
                    mi_tarea.field = File(field)
                    
                mi_tarea.save()

                serializiador = HomeworkStudentSerializer(mi_tarea).data
                return Response(serializiador,
                    status=status.HTTP_200_OK
                )
            else:
                if not field:
                    
                    HomeworkStudent.objects.create(
                        homework_id = data.get('homework'), 
                        student_id=user.id,
                        delivery_date = data.get('delivery_date'),
                        text = data.get('text')
                    )
                    return Response({'creado':'fue creado correctamente'},
                        status=status.HTTP_201_CREATED
                    )
                else:
                    HomeworkStudent.objects.create(
                        homework_id = data.get('homework'), 
                        student_id=user.id,
                        delivery_date = data.get('delivery_date'),
                        text = data.get('text'),
                        field = File(field)
                    )
                    return Response({'creado':'fue creado correctamente'},
                        status=status.HTTP_201_CREATED
                    )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['get'])
    def traerDetalleTarea(self, request, *args, **kwargs):
        student = request.user.profile.student
        id_tarea = request.query_params.get('id_tarea')
        
        tarea = Homework.objects.get(id = id_tarea)
        mi_tarea = tarea.homeworkStudent_homework.filter(student = student, state =True).first()
        serializer = HomeworkStudentSerializer(mi_tarea)
        print(mi_tarea)
        print(serializer.data)
        return Response(serializer.data,
            status=status.HTTP_200_OK)
    

class RetrieveHomeworkStudentApiView(generics.RetrieveAPIView):
    serializer_class = RetrieveHomeworkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Homework.objects.filter(state=True)
    


