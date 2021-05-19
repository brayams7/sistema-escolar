from django.db import models
from api.models.baseModel import BaseModel
from api.models.profile import Profile

class Profession(BaseModel):
    name = models.CharField(max_length=50, verbose_name="Profesion", unique=True)
    decription = models.CharField(max_length=255, verbose_name="Descripcion", blank=True)

    def __str__(self):
        return self.name

class Teacher(BaseModel):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    profession =  models.ForeignKey(Profession, on_delete=models.CASCADE)
    is_holder = models.BooleanField(default=True, verbose_name="¿es titular?")

    def delete(self, *args):
        profile = self.profile
        profile.state = False
        profile.save()
        user = profile.user
        user.is_active = False
        user.save()
        self.state = False
        self.save()
        return True

'''
    asignación de cursos a un estudiante (catdedrático):
     - en este caso se agragrá en la tabla asignacion estudiante el campo <is_active>, para saber existe a ese curso o no.
     - para que un catedrático pueda asignar a un estudiante a su curso, se debe agregar un campo en la tabla
       estudiante llamado grado(relacion con grado).
       para que se pueda filtrar todos los estudiantes que cursan el mismo grado que está asignado en la tabla de
       asignacion, de esta manera sabrá el estudiante debe cursar el curso perteneciente al grado.
'''