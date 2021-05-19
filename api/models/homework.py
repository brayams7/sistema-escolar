from api.models.baseModel import BaseModel
from django.db import models
from api.models import Asignation, Student
from django.db import models as mod

class Homework(mod.Model):
    asignation = models.ForeignKey(Asignation, on_delete=models.CASCADE, related_name='asignations_homework')
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=255, null=True, blank=True)
    field = models.FileField(upload_to='tareas', null=True, blank=True)
    delivery_date = models.DateField()
    delivery_time = models.TimeField()
    note = models.IntegerField()
    state = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True, auto_now_add=False)


class HomeworkStudent(BaseModel):
    homework = models.ForeignKey(Homework, on_delete=models.CASCADE, related_name = 'homeworkStudent_homework')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name ='homework_students')
    delivery_date = models.DateField()
    field = models.FileField(upload_to='tareas/estudiantes', null=True, blank=True)
    text = models.CharField(max_length=255, null=True, blank=True)
    note = models.DecimalField(decimal_places=2, max_digits=4, blank=True, null=True)