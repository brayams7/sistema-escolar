from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from api.serializers.user import ProfileSerializer
from api.models.profile import Profile
from api.models.student import Student
from api.models import Grade, Asignation
import datetime
import random
from api.models.teacher import (
    Teacher, Profession
)

class StudentSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="correo electronico", validators=[
        UniqueValidator(queryset=User.objects.all())
        ])
    password= serializers.CharField(max_length=20, min_length=7, allow_blank=False)
    password_confirmation = serializers.CharField(max_length=20, min_length=7,  allow_blank=False)
    first_name = serializers.CharField(min_length=2,  allow_blank=False)
    last_name = serializers.CharField(min_length=2,  allow_blank=False)
    grade = serializers.IntegerField()
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="el numero de telefono debe de ser +543453453"
    )
    address = serializers.CharField(max_length=60, allow_blank=False)
    phone = serializers.CharField(validators= [phone_regex])

    def validate_grade(self, value):
        grade=Grade.objects.filter(id=value).first()
        if not grade:
            raise serializers.ValidationError("El grado no existe, necesita crear uno")
        
        self.context['grade'] = grade

        return value


    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError('Las contraseñas no son iguales')
        return data
    
    def validate_contact_address(self, value):
        if not value:
            value = ''
        return value
class ListStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ['created','modified']
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'profile': str(instance.profile.user.first_name) + ' '+ str(instance.profile.user.last_name),
            'carne':instance.carne,
            'email': instance.profile.user.email,
            'grade': instance.grade.name
        }

class RetrieveStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ['created','modified']
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'first_name':instance.profile.user.first_name,
            'last_name':instance.profile.user.last_name,
            'email': instance.profile.user.email,
            'carne':instance.carne,
            'address': instance.profile.address,
            'phone': instance.profile.phone,
            'contact_address':instance.phone_contact,
            'phone_contact':instance.phone_contact         
        }

class UpdateStudentSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, allow_blank=False)
    first_name = serializers.CharField(min_length=2,  allow_blank=False)
    last_name = serializers.CharField(min_length=2,  allow_blank=False)
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="el numero de telefono debe de ser +543453453"
    )
    address = serializers.CharField(max_length=60, allow_blank=False)
    phone = serializers.CharField(validators= [phone_regex])
    
    def validate_contact_address(self, value):
        if not value:
            value = ''
        return value

class AsignationStudentSerializer(serializers.Serializer):
    id_asignation = serializers.IntegerField()
    id_student = serializers.IntegerField()

    def validate_id_asignation(self, value):
        asignation = Asignation.objects.filter(id=value).first()
        if not asignation:
            raise serializers.ValidationError('el codigo de asignacion no exite')
        self.context['asignation'] =asignation

        return value
    
    def validate_id_student(self, value):
        student = Student.objects.filter(id=value).first()
        if not student:
            raise serializers.ValidationError('el estudiante no existe')
        self.context['student'] =student

        return value  