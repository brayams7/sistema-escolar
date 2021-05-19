from rest_framework import serializers
from api.models import ClassMaterial

class ClassMaterialSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ClassMaterial
        exclude = ['created', 'modified']


class ListClassMaterialSerializer(serializers.ModelSerializer):
    rol = serializers.IntegerField(default = 0)
    class Meta:
        model = ClassMaterial
        exclude = ['created', 'modified', 'state']


class UpdateClassMaterialSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ClassMaterial
        exclude = ['asignation','created', 'modified', 'state']
