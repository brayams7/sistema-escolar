# Generated by Django 2.2.13 on 2021-05-01 18:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20210430_0012'),
    ]

    operations = [
        migrations.AddField(
            model_name='homeworkstudent',
            name='note',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='homeworkstudent',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='homework_students', to='api.Student'),
        ),
    ]