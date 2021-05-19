from api.models.baseModel import BaseModel
from django.db import models
from django.utils import timezone

class SchoolCycle(BaseModel):
    anio = models.IntegerField(unique=True, default= timezone.now().year)

    def __str__(self):
        return self.name
    
    def delete(self):
        self.created = False
        self.save()

class Events(BaseModel):
    anio = models.ForeignKey(SchoolCycle, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=255, blank=True)
    date = models.DateField()
    hora = models.CharField(max_length=6, default='')

    def delete(self):
        self.created = False
        self.save()