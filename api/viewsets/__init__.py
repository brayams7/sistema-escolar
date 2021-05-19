from .user import UserViewset, change_PasswordViewset, RecoverUserPassword
from .admin.student.student import StudentViewset
from .admin.student.coursesAsignationStudent import CourseStudentViewSet
from .admin.student.studentHomework import HomeworkStudentViewSet, RetrieveHomeworkStudentApiView

from .admin.dashboard import DashboardAdminViewSet
from .admin.student.dashboardStudent import DashboardStudentViewSet
from .admin.teacher.dashboardTeacher import DashboardTeacherViewSet

from .admin.teacher.teacher import TeacherViewset
from .admin.teacher.asigantionsTeacher import AsigantionListTeacherViewSet
from .admin.teacher.professions import ProfesionsViewset
from .levelViewSet import LevelViewSet
from .gradeViewSet import GradeViewSet
from .courseViewSet import CourseViewSet
from .sectionViewSet import SectionViewSet
from .SchoolCycleViewSet import SchoolCycleViewSet
from .eventViewSet import EventViewSet
from .asigantionViewSet import AsigantionViewSet, AsignationTeacherListViewSet
from .asignationStudent import AsigantionStudentViewSet, EstudiantesAsignadosViewSet, DeleteStudentAsignation
from .admin.teacher.classMaterial import MaterialViewSet, RetrieveMaterialAPIView
from .admin.teacher.homeworks import HomeworkViewSet, RetrieveHomeworkAPIView, CalificationHomework
