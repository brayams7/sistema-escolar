from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets

router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'teacher', viewsets.TeacherViewset, basename='teacher')
router.register(r'student', viewsets.StudentViewset, basename='student')
router.register(r'profession', viewsets.ProfesionsViewset, basename='profession')
router.register(r'change-password', viewsets.change_PasswordViewset, basename='change-password')
router.register(r'recover-password', viewsets.RecoverUserPassword, basename='user-email')
router.register(r'level', viewsets.LevelViewSet, basename='level')
router.register(r'grade', viewsets.GradeViewSet, basename='grade')
router.register(r'section', viewsets.SectionViewSet, basename='section')
router.register(r'course', viewsets.CourseViewSet, basename='course')
router.register(r'cycleSchool', viewsets.SchoolCycleViewSet, basename='school-cycle')
router.register(r'event', viewsets.EventViewSet, basename='event')
router.register(r'asignation', viewsets.AsigantionViewSet, basename='asignation')
router.register(r'asignation-teacher', viewsets.AsigantionListTeacherViewSet, basename='asignation-teacher')
#este viewset trae a todos los estudiantes que no estan asignados a un curso correspondiente a su grado
router.register(r'asignation-student', viewsets.AsigantionStudentViewSet, basename='asignation-student')
#listado de los estudiantes ya asignados
router.register(r'list-student-assigned', viewsets.EstudiantesAsignadosViewSet, basename='list-student-assigned')
router.register(r'material-class', viewsets.MaterialViewSet, basename='material-class')
router.register(r'homework', viewsets.HomeworkViewSet, basename='homework')
#cursos de los estudiantes
router.register(r'courses-students', viewsets.CourseStudentViewSet, basename='courses-students')
#tareas de estudiantes
router.register(r'homework-student', viewsets.HomeworkStudentViewSet, basename='homework-student')
router.register(r'calification-homework', viewsets.CalificationHomework, basename='calification-homework')
#router.register(r'teacher-courses', viewsets.CourseListTeacherViewSet, basename='teacher-courses')

router.register(r'dashboard-admin', viewsets.DashboardAdminViewSet, basename='dashboard-admin')
router.register(r'dashboard-student', viewsets.DashboardStudentViewSet, basename='dashboard-student')
router.register(r'dashboard-teacher', viewsets.DashboardTeacherViewSet, basename='dashboard-teacher')


urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
    path('api/delete-student-asignation/<int:id_student>/<int:id_asignation>/', viewsets.DeleteStudentAsignation.as_view(), name='delete-student-asignation'),
    path('api/retrieve-material/<int:id_asignation>/<int:id_material>/', viewsets.RetrieveMaterialAPIView.as_view(), name='retrieve-material'),
    path('api/retrieve-homework-student/<int:pk>/', viewsets.RetrieveHomeworkStudentApiView.as_view(), name='retrieve-homework-student'),
    path('api/retrieve-homework/<int:id_asignation>/<int:id_homework>/', viewsets.RetrieveHomeworkAPIView.as_view(), name='retrieve-homework')
    #path('api/detail-teacher-asignation/<int:pk>/', viewsets.AsignationTeacherList.as_view(), name='teacher-asignation')
]
