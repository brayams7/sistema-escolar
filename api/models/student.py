from django.db import models
from api.models.baseModel import BaseModel
from api.models.profile import Profile
from api.models.grade import Grade

class Student(BaseModel):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    carne = models.CharField(max_length=25, unique=True)
    contact_address = models.CharField(max_length=100, blank=True, null=True, default="")
    phone_contact = models.CharField(max_length=30, blank=True, null=True, default="")
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return '{} {}'.format(self.profile.user.first_name, self.profile.user.last_name)
        
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

