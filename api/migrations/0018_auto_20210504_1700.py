# Generated by Django 2.2.13 on 2021-05-04 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20210502_0426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homeworkstudent',
            name='homework',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='homeworkStudent_homework', to='api.Homework'),
        ),
    ]