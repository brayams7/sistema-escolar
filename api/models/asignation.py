from api.models.baseModel import BaseModel
from django.db import models
from api.models.school_cycle import SchoolCycle
from api.models.grade import Grade
from api.models.section import Section
from api.models.course import Course
from api.models.teacher import Teacher
from api.models.student import Student
from django.db import models as m

class Asignation(BaseModel):
    schoolCycle = models.ForeignKey(SchoolCycle, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    asignation_student = models.ManyToManyField(Student, through='AsignationStudent', through_fields=('asignation','student'))
    avatar = models.FileField(upload_to = 'image_port_course', null=True, blank=True)
    description = models.CharField(max_length=255, blank=False, help_text='describa esta asignacion')

    def __str__(self):
        return '{} curso de {}, grado de {}'.format(self.teacher.profile.user.first_name, self.course.name, self.grade.name)
#def material_directory_path(instance, filename):
#    return '{}/{}/{}'.format(instance.grade.name, instance.section.name, filename)

class AsignationStudent(BaseModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='asignation_student')
    asignation = models.ForeignKey(Asignation, on_delete=models.CASCADE)

    def __str__(self):
        return '{} {}'.format(self.student.profile.user.first_name, self.student.profile.user.last_name)

    def delete(self):
        self.state = False
        self.save()

class ClassMaterial(m.Model):
    asignation = models.ForeignKey(Asignation, on_delete=models.CASCADE, related_name='asignations')
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    directory_field = models.FileField(upload_to = 'materiales', blank=True, null=True)
    state = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True, auto_now_add=False)
