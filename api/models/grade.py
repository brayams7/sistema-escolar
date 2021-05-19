from api.models.baseModel import BaseModel
from django.db import models

class Level(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    description =models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return self.name

    def delete(self):
        self.created = False
        self.save()

class Grade(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    level = models.ForeignKey(Level, on_delete=models.CASCADE)
    description =models.CharField(max_length=255, blank=False, null=False)
    
    def __str__(self):
        return self.name
    
    def delete(self):
        self.level.created = False
        self.level.save()
        self.created = False
        self.save()