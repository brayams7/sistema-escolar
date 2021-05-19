# Generated by Django 2.2.13 on 2021-04-21 15:22

from django.db import migrations

def createRol(apps, schema_editor):
    try:
        Rol = apps.get_model('api','Rol')
        Rol.objects.create(name='administrador')
        Rol.objects.create(name='catedratico')
        Rol.objects.create(name='estudiante')
    except Exception as e:
        print('error', e)

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(createRol),
    ]
