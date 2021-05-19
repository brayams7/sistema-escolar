from rest_framework import serializers
from api.models import Asignation, Teacher
from api.serializers.teachers.teacher_serializers import TeacherSerializer
from api.serializers.courseSerializer import CourseListSerializer
from api.serializers.secctionSerializer import SectionListSerializer
from api.serializers.grade import GradeListSerializer
from api.serializers.cycleSchoolSerializer import SchoolCycleListSerializer

class AsignationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignation
        exclude = ['created','modified']
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'course':instance.course.name,
            'section':instance.section.name,
            'id_section':instance.section.id,
            'id_grade': instance.grade.id,
            'grade':instance.grade.name,
            'teacher':instance.teacher.profile.user.first_name + ' ' + instance.teacher.profile.user.last_name  
        }

class AsignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignation
        exclude = ['created','modified','state']

class RetrieveTeacherSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Teacher
        exclude = ['created','modified','state']
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'value':instance.profile.user.first_name + ' ' + instance.profile.user.last_name
        }


class RetrieveAsignationSerializer(serializers.ModelSerializer):
    schoolCycle = SchoolCycleListSerializer()
    course = CourseListSerializer()
    section = SectionListSerializer()
    grade =  GradeListSerializer()
    teacher = RetrieveTeacherSerializer()

    class Meta:
        model = Asignation
        fields = ['id','schoolCycle','course','section','grade','teacher', 'avatar','description']

class TotalTareasPendientesPorCursoSerializer(serializers.ModelSerializer):
    pendientes_calificar = serializers.IntegerField()
    class Meta:
        model = Asignation
        exclude = ['created','modified']
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'course':instance.course.name,
            'pendientes_calificar': instance.pendientes_calificar  
        }