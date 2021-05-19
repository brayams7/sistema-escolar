from api.serializers.teachers.teacher_serializers import TeacherSerializer, ListTeacherSerializer, RetrieveTeacherSerializer, UpdateTeacherSerializer
from api.models.teacher import Teacher, Profession
from api.models.profile import Profile
from api.models.rol import Rol
from api.serializers.user import UserReadSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.db import transaction
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404

class TeacherViewset(viewsets.ModelViewSet):
    
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("profile__user__first_name", "profile__user__first_name")
    search_fields = ("profile__user__first_name", "profile__user__first_name")
    #ordering_fields = ("username", "first_name")
    
    def get_queryset(self):
        #listado de los catedráticos
        return Teacher.objects.filter(state=True)

    def get_serializer_class(self):
        """return serializer class"""
        if self.action == 'create':
            return TeacherSerializer
        elif self.action == 'retrieve':
            return RetrieveTeacherSerializer
        elif self.action == 'update':
            return UpdateTeacherSerializer
        else:
            return ListTeacherSerializer
    
    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        serializer =  self.get_serializer(data = request.data)
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

                user = User(
                    username=username, 
                    email=email, 
                    first_name=first_name, 
                    last_name=last_name,
                    password=password
                )
                user.set_password(password)
                user.save()
                
                rol = get_object_or_404(Rol, id=2)
                profile,_ = Profile.objects.get_or_create(user=user, rol=rol, phone=phone, address=address)
                print(profile)
                Teacher.objects.create(profile=profile,profession=serializer.context['profession'])

                userSerialialzer = UserReadSerializer(user)
                headers = self.get_success_headers(serializer.data)
                return Response(
                    userSerialialzer.data,
                status=status.HTTP_201_CREATED, headers=headers)
                
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

        instance.profession = serializer.context.get('profession', instance.profession)
        instance.save()
        userSerialialzer = UserReadSerializer(user)
        return Response(userSerialialzer.data, 
        status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        return serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}