from api.models.baseModel import BaseModel
from django.db import models

class Course(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=255, blank=False, null=False)
    
    def __str__(self):
        return self.name
    
    def delete(self):
        self.created = False
        self.save()