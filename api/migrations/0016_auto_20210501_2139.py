# Generated by Django 2.2.13 on 2021-05-01 19:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20210501_2033'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asignationstudent',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asignation_student', to='api.Student'),
        ),
    ]