from rest_framework import serializers
#from django.contrib.auth.models import User
from api.models import Profile
from django.contrib.auth.models import User
#email
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
#settings
from app import settings
from django.utils import timezone
from datetime import timedelta
# jwt
import jwt

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'profile',
            'password'
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )

class UserChangePassword(serializers.Serializer):
    password = serializers.CharField(max_length=20, min_length=7, allow_blank=False)
    password_confirmation = serializers.CharField(max_length=20, min_length=7,  allow_blank=False)

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError('Las contraseñas no son iguales')
        return data


class UserRecoverPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="correo electronico")

    def validate_email(self, value):
        user = User.objects.filter(email=value).first()
        if not user:
            raise serializers.ValidationError('El correo no existe')
        self.context['user'] = user
        return value

    
    def create(self, data):
        user = self.context.get('user')
        enviado = self.send_email(user)
        if not enviado:
            return False
        print('se envió')
        return True

    def send_email(self, user):
        try:
            token = self.generated_token_email(user)
            subject = 'Hola...!! {},  Recuperacion de contraseña'.format(user.first_name)
            from_email = settings.EMAIL_HOST_USER

            content = render_to_string('user/email/recoverPassword.html',
                {'url_token': "http://localhost:3002/#/recovery-password/{}".format(token), 'user': user})
            msg = EmailMultiAlternatives(subject, content, from_email, [user.email])
            msg.attach_alternative(content, "text/html")
            msg.send()
            return True

        except Exception as e:
            print('ocurruio un error')
            print(e)
            return False 
        
    def generated_token_email(self, user):
        exp_date = timezone.now() + timedelta(seconds = 600)
        payload = {
            'user':user.id,
            'exp': int(exp_date.timestamp()),
            'type':'recover_password'
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token

class UserVerifyTokenSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate_token(self, data):
        try:
            payload = jwt.decode(data, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise serializers.ValidationError('La verifiacion ha expirado')
        except jwt.PyJWKError:
            print(1)
            raise serializers.ValidationError('token invalido')

        if payload.get('type') != 'recover_password':
            print(2)
            raise serializers.ValidationError('token invalido')
        
        self.context['payload'] = payload 
        return data