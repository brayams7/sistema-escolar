from api.models import ClassMaterial, Asignation
from rest_framework import viewsets
from django.core.files import File
from api.serializers.teachers.classMaterialSerializer import ListClassMaterialSerializer, ClassMaterialSerializer, UpdateClassMaterialSerializer
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
from django.db.models import F

class MaterialViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("created",)
    search_fields = ("title",)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ClassMaterialSerializer
        elif self.action == 'update':
            return UpdateClassMaterialSerializer
        else:
            return ListClassMaterialSerializer
    
    def get_queryset(self):
        return ClassMaterial.objects.filter(state = True)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    def retrieve(self, request, *args, **kwargs):
        #materiales asignados a esta asignacion
        rol = request.user.profile.rol
        id_asignation = kwargs.get('pk')
        asignation = get_object_or_404(Asignation, id = id_asignation)
        
        #este id de rol es para enviarle a la consulta un id de rol para saber si mostrar el bototn de modificar o no.
        if (rol.id == 2):
            materiales = asignation.asignations.filter(state = True).annotate(rol = F('asignation__teacher__profile__rol_id'))
        else:
            materiales = asignation.asignations.filter(state = True)
        
        queryset = self.filter_queryset(materiales)
        page = self.paginate_queryset(materiales)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(materiales, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request_data = request.data
        directory_field = request_data.get('directory_field')
        data = json.loads(request_data['data'])
        data['asignation'] = int(data.get('asignation'))
        data.pop('directory_field')
        serializer = self.get_serializer(data = data)
        if serializer.is_valid():
            if not directory_field:
                serializer.save()
                return Response({'creado':'Se ha creado correctamente'},
                    status=status.HTTP_201_CREATED
                )
            else:
                ClassMaterial.objects.create(
                    asignation_id = data.get('asignation'),
                    title = data.get('title'),
                    description=data.get('description'),
                    directory_field = File(directory_field)    
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
            directory_field = data.get("directory_field")
            print('archivo',directory_field)
            data = json.loads(data["data"])
            material = get_object_or_404(ClassMaterial, id=pk)
            serializer = self.get_serializer(material, data=data)
            if serializer.is_valid():
                if material:
                    if material.directory_field is not None and directory_field is not None:
                        material.directory_field.delete()

                    instance = serializer.save()
                    
                    if directory_field is not None:
                        instance.directory_field = File(directory_field)
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

class RetrieveMaterialAPIView(generics.RetrieveAPIView):
    #trae el material para modifiacar o eliminar
    serializer_class = ListClassMaterialSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Asignation.objects.filter(state=True)

    def get_object(self):
        id_asignation = self.kwargs.get('id_asignation')
        id_material = self.kwargs.get('id_material')

        asignation = self.get_queryset().filter(id = id_asignation).first()
        material = asignation.asignations.get(id = id_material)

        return material
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        print(2)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

