from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from api.serializers.user import ProfileSerializer
from api.models.profile import Profile
from api.models.teacher import Profession, Teacher
from api.models.teacher import (
    Teacher, Profession
)
from api.models import Asignation
class ProfessionSerialzer(serializers.ModelSerializer):
    class Meta:
        model=Profession
        exclude=(
            'state',
            'created',
            'modified'
        )

class ProfessionListSerialzer(serializers.ModelSerializer):
    class Meta:
        model=Profession
        exclude=(
            'state',
            'modified'
        )

class TeacherSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="correo electronico", validators=[
        UniqueValidator(queryset=User.objects.filter(is_active=True))
        ])
    password= serializers.CharField(max_length=20, min_length=7, allow_blank=False)
    password_confirmation = serializers.CharField(max_length=20, min_length=7,  allow_blank=False)
    first_name = serializers.CharField(min_length=5,  allow_blank=False)
    last_name = serializers.CharField(min_length=5,  allow_blank=False)
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="el numero de telefono debe de ser +543453453"
    )
    address = serializers.CharField(max_length=60, allow_blank=False)
    phone = serializers.CharField(validators= [phone_regex])
    profession = serializers.IntegerField()

    def validate_profession(self, value):
        profession=Profession.objects.filter(id=value).first()
        if not profession:
            raise serializers.ValidationError("la profesión no existe, necesita crear uno")
        
        self.context['profession'] = profession

        return value

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError('Las contraseñas no son iguales')
        return data


class UpdateTeacherSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="correo electronico", allow_blank=False)
    first_name = serializers.CharField(min_length=5,  allow_blank=False)
    last_name = serializers.CharField(min_length=5,  allow_blank=False)
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="el numero de telefono debe de ser +543453453"
    )
    address = serializers.CharField(max_length=60, allow_blank=False)
    phone = serializers.CharField(validators= [phone_regex])
    profession = serializers.IntegerField()

    def validate_profession(self, value):
        profession=Profession.objects.filter(id=value).first()
        if not profession:
            raise serializers.ValidationError("la profesión no existe, necesita crear uno")
        
        self.context['profession'] = profession

        return value

    

class RetrieveTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        exclude = ['created','modified']
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'first_name':instance.profile.user.first_name,
            'last_name':instance.profile.user.last_name,
            'email': instance.profile.user.email,
            'phone': instance.profile.phone,
            'address': instance.profile.address,
            'profession': {
                'id':instance.profession.id,
                'name':instance.profession.name
            }
        }
    
class ListTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        exclude = ['id','created','modified']
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'profile': str(instance.profile.user.first_name) + ' '+ str(instance.profile.user.last_name),
            'email': instance.profile.user.email,
            'es_titular': instance.is_holder,
            'profession': instance.profession.decription
        }
    
