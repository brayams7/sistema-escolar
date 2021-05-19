from rest_framework import serializers
from api.models import Homework
class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        exclude = ['created','state','modified']


class HomeworkListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        exclude = ['created','state','modified']
        depth = 1

class RetrieveHomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        exclude = ['asignation','created','state','modified']