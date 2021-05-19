from django.db import models

class BaseModel(models.Model):
    id = models.AutoField(primary_key=True)
    state = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True, auto_now_add=False)

    class Meta:
        abstract = True
        verbose_name = "Model base"
    
    def delete(self, *args):
        self.state = False
        self.save()
        return True
