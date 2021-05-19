from rest_framework import serializers
from api.models import AsignationStudent, Homework

class ListStudentAssignedSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignationStudent
        exclude = ['created','modified','state']
    def to_representation(self, instance):
        return {
            'id_student': instance.student.id,
            'student': str(instance.student),
        }

class CoursesStudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignationStudent
        exclude = ['created','modified','state']

    def to_representation(self, instance):
        return {
            'id':instance.id,
            'grade':instance.student.grade.name
        }

class RetrieveCoursesStudentSerializer(serializers.ModelSerializer):
    teacher = serializers.SerializerMethodField("getTeacher")
    class Meta:
        model = AsignationStudent
        exclude = ['created','modified','state']
        depth = 2
    
    def getTeacher(self, obj):
        return obj.asignation.teacher.profile.user.first_name +' '+ obj.asignation.teacher.profile.user.last_name

class ListHomeworkStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        exclude = ['created','modified','state']