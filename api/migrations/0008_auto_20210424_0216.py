# Generated by Django 2.2.13 on 2021-04-24 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_asignation_asignation_student'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asignation',
            name='avatar',
            field=models.FileField(blank=True, null=True, upload_to='image_port_course'),
        ),
    ]