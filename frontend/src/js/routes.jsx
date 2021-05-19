import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';
import ChangePassword from './common/components/LoginRegister/Password/changePasswordContainer'

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

//my components
import TeacherContainer from './common/components/admin/teacher/createTeacherContainer'
import ListTeacherContainer from './common/components/admin/teacher/listTeacherContainer'
import StudentContainer from './common/components/admin/student/registerStudentContainer'
import ListStudentContainer from './common/components/admin/student/listStudentContainer'
//recuperación de contraseña
import EmailContainer from './common/components/LoginRegister/Password/EmailContainer'
//profesiones
import ListProfessionContainer from './common/components/admin/professions/professionListContainer'
import RegisterProfession from './common/components/admin/professions/professionContainer'
//levels 
import LevelListContainer from './common/components/niveles/levelListContainer'
import LevelContainer from './common/components/niveles/levelRegisterContainer'
//grados
import GradeListContainer from './common/components/grados/gradeListContainer'
import GradeContainer from './common/components/grados/gradeRegisterContainer'
//sections
import SectionContainer from './common/components/section/sectionRegisterContainer'
import SectionListContainer from './common/components/section/sectionListContainer'
//cursos
import CourseListContainer from './common/components/cursos/courseListContainer'
import CourseContainer from './common/components/cursos/courseRegisterContainer'
//ciclo escolar
import CycleEscolar from './common/components/cicloEscolar/cycleListContainer'
//eventos
import EventRegister from './common/components/eventos/eventRegisterContainer'
import EventList from './common/components/eventos/eventListContainer'
import EventReadOnly from './common/components/eventos/eventReadOnlyContainer'


//asignacion
import AsignationRegisterContainer from './common/components/asignation/asignationRegisterContainer'
import AsignationList from './common/components/asignation/asignationListContainer'
import AsignationListTeacher from './common/components/asignation/asignationTeaacherContainer'

import AsignationStudent from './common/components/admin/asignationStudent/asignationStudentRegisterContainer'

import ListCoursesTeacher from './common/components/admin/teacher/Courses/listContainer'
import ListMaterial from './common/components/admin/teacher/material/listMaterialContainer' 
import RegisterMaterial from './common/components/admin/teacher/material/materialContainer' 

import ListHomework from './common/components/admin/teacher/homeworks/listHomeworkContainer' 
import RegisterHomework from './common/components/admin/teacher/homeworks/registerHomeworkContainer' 

//tareas entregadas
import ListHomeworkDelivered from './common/components/admin/teacher/calification-homework/homeworkDeliveredContainer' 
import AsignationNoteStudentHomework from './common/components/admin/teacher/calification-homework/asignationNoteContainer' 


//cursos de los estudiantes
import ListCoursesStudent from './common/components/admin/student/Courses/listContainer'
import DetailCoursesStudent from './common/components/admin/student/Courses/detailCourseContainer'

//tareas de los estudiante
import ListHomeworkStudent from './common/components/admin/student/tareas/listHomeworkStudentContainer'
import RegisterHomeworkStudent from './common/components/admin/student/tareas/registerHomeworkStudentContainer'

//dashboards

import IndexAdmin from './common/components/index/admin/indexContainer'
import IndexStudent from './common/components/index/student/indexStudenContainer'
import IndexTeacher from './common/components/index/teacher/indexTeacherContainer'


module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/change-password/:id" component={ChangePassword}/>
                <Route exact path="/recover-password" component={EmailContainer}/>
                <Route exact path="/recovery-password/:token" component={ChangePassword}/>
                
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/profession" component={ListProfessionContainer} />
                <ProtectedRoute exact path="/profession/register" component={RegisterProfession} />
                <ProtectedRoute exact path="/profession/ver/:id" component={LevelContainer} />
                <ProtectedRoute exact path="/profession/:id/editar" component={LevelContainer} />
                
                <ProtectedRoute exact path="/teacher/register" component={TeacherContainer} />
                <ProtectedRoute exact path="/teacher" component={ListTeacherContainer} />
                <ProtectedRoute exact path="/teacher/ver/:id" component={TeacherContainer} />
                <ProtectedRoute exact path="/teacher/:id/editar" component={TeacherContainer} />
                
                <ProtectedRoute exact path="/student/register" component={StudentContainer} />
                <ProtectedRoute exact path="/student" component={ListStudentContainer} />
                <ProtectedRoute exact path="/student/ver/:id" component={StudentContainer} />
                <ProtectedRoute exact path="/student/:id/:editar" component={StudentContainer} />
                
                <ProtectedRoute exact path="/level" component={LevelListContainer} />
                <ProtectedRoute exact path="/level/register" component={LevelContainer} />
                <ProtectedRoute exact path="/level/ver/:id" component={LevelContainer} />
                <ProtectedRoute exact path="/level/:id/editar" component={LevelContainer} />

                <ProtectedRoute exact path="/grades" component={GradeListContainer} />
                <ProtectedRoute exact path="/grades/register" component={GradeContainer} />
                <ProtectedRoute exact path="/grade/:id/editar" component={GradeContainer} />
                <ProtectedRoute exact path="/grade/ver/:id" component={GradeContainer} />

                <ProtectedRoute exact path="/section" component={SectionListContainer} />
                <ProtectedRoute exact path="/section/register" component={SectionContainer} />
                <ProtectedRoute exact path="/section/:id/editar" component={SectionContainer} />
                <ProtectedRoute exact path="/section/ver/:id" component={SectionContainer} />

                <ProtectedRoute exact path="/course" component={CourseListContainer} />
                <ProtectedRoute exact path="/course/register" component={CourseContainer} />
                <ProtectedRoute exact path="/course/:id/editar" component={CourseContainer} />
                <ProtectedRoute exact path="/course/ver/:id" component={CourseContainer} />

                <ProtectedRoute exact path="/cycleSchool" component={CycleEscolar} />

                <ProtectedRoute exact path="/event" component={EventList} />
                <ProtectedRoute exact path="/event/register" component={EventRegister} />
                <ProtectedRoute exact path="/event/:id/editar" component={EventRegister} />
                <ProtectedRoute exact path="/event/ver/:id" component={EventRegister} />
                <ProtectedRoute exact path="/eventOnlyRead" component={EventReadOnly} />
                

                <ProtectedRoute exact path="/asignation" component={AsignationList}/>
                <ProtectedRoute exact path="/asignation/register" component={AsignationRegisterContainer}/>
                <ProtectedRoute exact path="/asignation/ver/:id" component={AsignationRegisterContainer}/>
                <ProtectedRoute exact path="/asignation/:id/editar" component={AsignationRegisterContainer}/>
                <ProtectedRoute exact path="/asignation/teacher/:id" component={AsignationListTeacher}/>

                <ProtectedRoute exact path="/asignarEstudiante/:id" component={AsignationStudent}/>       
                <ProtectedRoute exact path="/coursesTeacher" component={ListCoursesTeacher}/>
                
                <ProtectedRoute exact path="/material/:id" component={ListMaterial}/>
                <ProtectedRoute exact path="/material/register/:id" component={RegisterMaterial}/>
                <ProtectedRoute exact path="/material/edit/:id_asignation/:id_material" component={RegisterMaterial}/>
                
                <ProtectedRoute exact path="/homework/:id" component={ListHomework}/>
                <ProtectedRoute exact path="/homework/register/:id" component={RegisterHomework}/>
                <ProtectedRoute exact path="/homework/edit/:id_asignation/:id_homework" component={RegisterHomework}/>

                <ProtectedRoute exact path="/listHomework/calification/:id_homework" component={ListHomeworkDelivered}/>
                <ProtectedRoute exact path="/detailHomework/calification/:id_homework_student" component={AsignationNoteStudentHomework}/>
                
                <ProtectedRoute exact path="/coursesStudent" component={ListCoursesStudent}/>
                <ProtectedRoute exact path="/course/detail/:id_asignation_student" component={DetailCoursesStudent}/>

                <ProtectedRoute exact path="/homeworkStudent/:id_asignation" component={ListHomeworkStudent}/>
                <ProtectedRoute exact path="/homeworkStudent/register/:id_homework" component={RegisterHomeworkStudent}/>

                
                <ProtectedRoute exact path="/indexAdmin" component={IndexAdmin}/>
                <ProtectedRoute exact path="/indexStudent" component={IndexStudent}/>
                <ProtectedRoute exact path="/indexTeacher" component={IndexTeacher}/>
                

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
