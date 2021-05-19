from api.models.baseModel import BaseModel
from django.db import models

class Section(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name
    
    def delete(self):
        self.created = False
        self.save()