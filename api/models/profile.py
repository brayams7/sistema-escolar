from django.db import models
from api.models.rol import Rol
from django.contrib.auth.models import User

class Profile(models.Model):

    MALE = 0
    FEMALE = 1  

    GENDERS = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDERS, null=True, blank=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    password_change = models.BooleanField(default=False, verbose_name='cammbio de contraseña por primera vez')
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.user.username
    def __str__(self):
        return '{} {}'.format(self.user.first_name, self.user.last_name)
           
    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True
