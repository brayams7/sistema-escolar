import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
//vamos a importar el estado inicial de registrar un catedradico, en este lugar especificamos el nombre del estado incial de catedrático
import teacher from './modules/admin/teacher/teacher'
//importando el estado inicial del estudiante perteneciente al admin
import student from './modules/admin/student/student'
import coursesStudent from './modules/admin/student/coursesStudent'

//estado de las profesiones
import profession from './modules/admin/professions/profession'
//levels
import level from './modules/niveles/niveles'
//grades
import grade from './modules/grados/grado'
//section
import section from './modules/sections/section'
//curso
import course from './modules/Cursos/curso'
//ciclo escolar
import cycleSchool from './modules/cicloEscolar/cicloEscolar'
//eventos
import event from './modules/eventos/evento'
//asigancion
import asignation from './modules/Asignacion/asignacion'
import asignationStudent from './modules/admin/student/asignationStudent'

//cursos del catedrático
import teacherAsignation from './modules/admin/teacher/teacherAsignation'

//material
import material_class from './modules/admin/teacher/material'

//tareas
import homework from './modules/admin/teacher/homework'
//tareas esudiante
import homeworkStudent from './modules/admin/student/tareas'
//index admin
import dashboardAdmin from './modules/admin/index'
import dashboardStudent from './modules/admin/student/indexStudent'
import dashboardTeacher from './modules/admin/teacher/indexTeacher'


export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    teacher,
    student,
    profession,
    level,
    grade,
    section,
    course,
    cycleSchool,
    asignation,
    event,
    asignationStudent,
    teacherAsignation,
    material_class,
    homework,
    coursesStudent,
    homeworkStudent,
    dashboardAdmin,
    dashboardStudent,
    dashboardTeacher,
});
