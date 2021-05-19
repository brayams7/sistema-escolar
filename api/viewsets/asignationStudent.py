from rest_framework import viewsets
from api.models import Asignation
from django.core.files import File
from api.serializers.administration.students import AsignationStudentSerializer, ListStudentSerializer
from api.serializers.asignationSerializerStudent import ListStudentAssignedSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.models import Teacher, Student, AsignationStudent, Asignation, Grade
import json
from django.shortcuts import get_object_or_404
from rest_framework import generics
import datetime

class AsigantionStudentViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'create':
            return AsignationStudentSerializer
        else:
            return ListStudentSerializer
    
    def get_queryset(self):
        return Student.objects.filter(state=True)

    def get_assigned_not_students(self, id_asignacion):
        #trae todos los estudiantes que pertenecen a un grado en espercífico y que mo están asignados
        #trae todos los etudiantes que no estén en esta asignacion

        asignation = get_object_or_404(Asignation, id = id_asignacion)
        queryset = self.filter_queryset(self.get_queryset())
        ids_estudiantes_asignados = AsignationStudent.objects.filter(asignation_id = asignation.id ,state=True).values_list('student_id')
        
        estudiantes_no_asignados = queryset.filter(grade_id = asignation.grade.id, state=True).exclude(id__in = ids_estudiantes_asignados)

        return estudiantes_no_asignados

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    def retrieve(self, request, *args, **kwargs):
        #listado de los estudiantes que pertencen a x grado
        id_asignacion = self.kwargs.get('pk')
        if id_asignacion != 0:
            students = self.filter_queryset(self.get_assigned_not_students(id_asignacion))
            page = self.paginate_queryset(students)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            
            serializer = self.get_serializer(students, many=True)
            return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request_data = request.data
        data = {}
        data['id_asignation'] = int(request_data.get('id_asignation'))
        data['id_student'] = int(request_data.get('student').get('value'))
        serializer = self.get_serializer(data = data)
        if serializer.is_valid():
            asignation = serializer.context['asignation']
            student = serializer.context['student']

            #para verificar si ya existe el estudiante asigando y solo su estado está en false
            existe_estudiante = AsignationStudent.objects.filter(student_id = student.id).first()
            print(existe_estudiante)
            if existe_estudiante:
                existe_estudiante.state =True
                existe_estudiante.save()
                return Response(
                    {'asignado':'se agregró nuevamente al estudiante'},
                    status=status.HTTP_201_CREATED
                )
            else:    
                try:
                    asignation.asignation_student.add(student)
                except Exception as e:
                    return Response(
                        {'erorr': 'error'},
                        status= status.HTTP_400_BAD_REQUEST
                    )
                
                return Response(
                    {'asignado':'asignado correctamente'},
                        status=status.HTTP_201_CREATED
                )
        else:
            return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

    def destroy(self, request, *args, **kwargs):
        id = self.kwargs.get('pk')
        print(id)
        
class DeleteStudentAsignation(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        id_asignation = kwargs.get('id_asignation')
        id_student = kwargs.get('id_student')
        student = get_object_or_404(Student, id = id_student)
        asignation = get_object_or_404(Asignation, id = id_asignation)
        print(student, asignation)
        try:
            estudiante_asignado = AsignationStudent.objects.filter(asignation_id = asignation.id, student_id = student.id).first()
            print(type(estudiante_asignado))
            estudiante_asignado.delete()
            print(estudiante_asignado.state)
        except Exception as e:
            return Response({
                'erorr':str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {'exito':'ha puesto al estudiante de baja'},
            status=status.HTTP_200_OK
        )


class EstudiantesAsignadosViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ListStudentAssignedSerializer
        else:
            return None

    def get_queryset(self):
        anio = datetime.datetime.now().year
        return Asignation.objects.filter(state=True, schoolCycle__anio = anio)

    def get_assigned_students(self, id_asignacion):
        #trae todos los estudiantes que pertenecen a un grado en espercífico y que ya están asignados
        #estudiante pertenecientes a esta asignacion
        asignation = get_object_or_404(Asignation, id = id_asignacion)
        estudiantes_asignados = AsignationStudent.objects.filter(asignation_id = asignation.id, state=True)
        return estudiantes_asignados

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]
    
    def retrieve(self, request, *args, **kwargs):
        #retornamos todos los estudiantes asignados a x asignaicion
        id_asignacion = self.kwargs.get('pk')
        students_asiggned = self.filter_queryset(self.get_assigned_students(id_asignacion))
        page = self.paginate_queryset(students_asiggned)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(students_asiggned, many=True)

        return Response(serializer.data)