from django.db import models
from api.models.baseModel import BaseModel
from django.db import models

class Rol(models.Model):
    name = models.CharField(max_length=25, unique=True, verbose_name='Rol')
    state = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.name

'''
def createRol(apps, schema_editor):
    try:
        Rol = apps.get_model('api','Rol')
        Rol.objects.create(name='administrador')
        Rol.objects.create(name='catedratico')
        Rol.objects.create(name='estudiante')
    except Exception as e:
        print('error', e)

migrations.RunPython(createRol),
'''