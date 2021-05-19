import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.shortcuts import get_object_or_404
from api.models import Profile
from api.serializers import UserSerializer, UserReadSerializer, UserRecoverPasswordSerializer, UserVerifyTokenSerializer
from api.serializers.user import UserChangePassword
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.decorators import api_view

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]  
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        usuario = User.objects.get(username=request.data["username"])
        usuario.set_password(request.data["password"])
        usuario.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            print(data)
            user = request.user
            print('user',user)
            if user.username != data["username"]:
                try:
                    User.objects.get(username=data["username"])
                    return Response(
                        {"detail": "the chosen username in not available, please pick another"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            user.username = data["username"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]          
            perfil = None

            if user.is_superuser:
                perfil = Profile.objects.filter(user=user).first()
                if not perfil:
                    perfil = Profile.objects.create(user=user, rol_id=1)
            else:
                perfil = Profile.objects.filter(user=user).first() 

            if avatar is not None:      
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            print(profile)
            if profile is not None:
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
                perfil.gender = profile.get("gender", perfil.gender)
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(email=data["email"])
            print(user.check_password(data['password']))
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)

    
class change_PasswordViewset(viewsets.ModelViewSet):
    def get_queryset(self):
        return User.objects.filter(is_active=True)
    
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'update':
            return UserChangePassword
        elif self.action == 'create':
            return UserVerifyTokenSerializer
        else:
            None
    
    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]  
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        '''Cambio de contraseña olvidada'''
        print(1)
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            print('llegó acá')
            payload = serializer.context['payload']
            id_user = payload.get('user')
            print('id',id_user)
            user = User.objects.get(pk=id_user)
            if user:
                print('si existe usuario')
                data = {
                    'password':request.data.get('password'),
                    'password_confirmation':request.data.get('password_confirmation')
                }

                print(data)
                valido = self.update_password(data, user)
                if valido == True:
                    return Response({'correcto':'exito'},
                    status=status.HTTP_200_OK)
                else:
                    return Response(valido, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                'error':'el usuario no existe!!! '
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        print(12345)
        print(request.data)
        user = self.get_object()
        valido = self.update_password(request.data, user)
        if valido:
            return Response({'correcto':'exito'},
                status=status.HTTP_200_OK)
        else:
            return Response(valido, status=status.HTTP_400_BAD_REQUEST)

    def update_password(self, data, user):
        password_serializer = UserChangePassword(data=data)
        if password_serializer.is_valid():
            print('valido')
            print(user.username)
            paasword = password_serializer.validated_data.get('password')
            user.set_password(paasword)
            profile = Profile.objects.filter(user=user).first()
            profile.password_change = True
            user.save()
            profile.save()
            return True
        else:
            return str(password_serializer.errors)

class RecoverUserPassword(viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserRecoverPasswordSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]  
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        #crear un jwt para el correo
        password_serializer = self.get_serializer(data=request.data)
        if password_serializer.is_valid():
            realizado = password_serializer.save()
            if realizado:    
                return Response({
                    'message':'the mail was sent correctly!!! '
                }, status = status.HTTP_200_OK)

            return Response({
                    'message':'error!!! '
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(password_serializer.errors,
             status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def change_Password(request, pk=None):
    if request.method == 'PUT':
        password_serializer = UserChangePassword(data=request.data)
        if password_serializer.is_valid():
            user = User.objects.filter(id=pk).first()
            paasword = password_serializer.validated_data.get('password')
            user.set_password(paasword)
            profile = Profile.objects.filter(user=user).first()
            profile.password_change = True
            user.save()
            profile.save()
            return Response({
                'message':'your password was changed correctly!!! '
            }, status=status.HTTP_200_OK)

        return Response(password_serializer.errors,
             status=status.HTTP_400_BAD_REQUEST)


