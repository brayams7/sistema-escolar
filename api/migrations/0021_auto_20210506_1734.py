# Generated by Django 2.2.13 on 2021-05-06 15:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_auto_20210506_1732'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asignationstudent',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asignation_student', to='api.Student'),
        ),
    ]
