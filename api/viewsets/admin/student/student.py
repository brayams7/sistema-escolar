from rest_framework import viewsets
from api.serializers.administration.students import StudentSerializer, ListStudentSerializer, UpdateStudentSerializer, RetrieveStudentSerializer
from api.models.student import Student 
from api.serializers.user import UserReadSerializer
from rest_framework import status
from api.models.profile import Profile
from django.contrib.auth.models import User
from api.models.rol import Rol
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
import datetime
import random

class StudentViewset(viewsets.ModelViewSet):

    def get_queryset(self):
        return Student.objects.filter(state=True)

    def get_serializer_class(self):
        """return serializer class"""
        if self.action == 'create':
            return StudentSerializer
        elif self.action == 'update':
            return UpdateStudentSerializer
        elif self.action == 'retrieve':
            return RetrieveStudentSerializer
        else:
            return ListStudentSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer =  self.get_serializer(data = request.data)
        print(request.data)
        with transaction.atomic():
            if serializer.is_valid():
                data = serializer.validated_data
                
                email = data.get('email')
                password = data.get('password')
                first_name = data.get('first_name')
                last_name = data.get('last_name')
                address= data.get('address')
                phone = data.get('phone')
                username = email

                contact_address = request.data.get('contact_address','')
                phone_contact = request.data.get('phone_contact','')

                user=User(
                    username=username,
                    email=email, 
                    password=password, 
                    first_name=first_name, 
                    last_name=last_name
                )
                user.set_password(password)
                user.save()

                print(user.email)
                rol = get_object_or_404(Rol, id=3)

                carne = self.verified_carne()
                
                profile,create = Profile.objects.get_or_create(user=user, rol = rol, phone=phone, address=address)
                print(profile)
                
                student=Student.objects.create(profile=profile, carne=carne, contact_address=contact_address, phone_contact=phone_contact
                                                , grade = serializer.context['grade']) 
                print(student.carne)
                userSerialialzer = UserReadSerializer(user) 
                headers = self.get_success_headers(serializer.data)
                return Response(
                    {
                        'user':userSerialialzer.data,
                        'carne':str(student.carne)
                    }
                ,status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        profile = instance.profile
        user = instance.profile.user

        data = serializer.validated_data
        #update user
        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()

        #update profile
        profile.phone =  data.get('phone', profile.phone)
        profile.address = data.get('address', profile.address)
        profile.save()
        
        #update student

        instance.contact_address = request.data.get('contact_address','')
        instance.phone_contact = request.data.get('phone_contact','')
        instance.save()

        userSerialialzer = UserReadSerializer(user)
        return Response(userSerialialzer.data, 
        status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        return serializer.save()

    def create_carne(self):        
        year = datetime.datetime.now().year
        first_carne = ''
        last_carne = ''
        for i in range(4):
            first_carne += str(random.randint(0,9))
        
        for i in range(4):
            last_carne += str(random.randint(0,9))
        
        return "{}-{}-{}".format(first_carne, str(year), last_carne)
    
    def verified_carne(self):
        unique = True
        carne = ''
        while unique:
            carne = self.create_carne()
            student = Student.objects.filter(carne=carne).exists()
            if not student:
                unique = False
        
        print(carne)
        
        return carne

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}