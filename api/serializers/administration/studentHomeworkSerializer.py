from rest_framework import serializers
from api.models import HomeworkStudent

class HomeworkStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeworkStudent
        exclude = ['created','modified','state']

class HomeworkNoteStudentSerializer(serializers.Serializer):
    note = serializers.CharField() 


class RetrieveHomeworkStudentSerializer(serializers.ModelSerializer):
    total_nota = serializers.SerializerMethodField("getNota")
    class Meta:
        model = HomeworkStudent
        exclude = ['created','modified','state']

    def getNota(self, obj):
        return obj.homework.note

class ListHomeworkStudentSerializer(serializers.ModelSerializer):
    student = serializers.SerializerMethodField("getStudent")
    id_student = serializers.SerializerMethodField("getIdStudent")
    class Meta:
        model = HomeworkStudent
        exclude = ['created','modified','state']
    
    def getStudent(self, obj):
        return obj.student.profile.user.first_name +' '+ obj.student.profile.user.last_name
    
    def getIdStudent(self, obj):
        return obj.student.id

