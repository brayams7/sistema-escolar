# Generated by Django 2.2.13 on 2021-04-29 03:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_homework_homeworkstudent'),
    ]

    operations = [
        migrations.RenameField(
            model_name='classmaterial',
            old_name='asigantion',
            new_name='asignation',
        ),
    ]
