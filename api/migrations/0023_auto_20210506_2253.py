# Generated by Django 2.2.13 on 2021-05-06 20:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_auto_20210506_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asignation',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Teacher'),
        ),
    ]
