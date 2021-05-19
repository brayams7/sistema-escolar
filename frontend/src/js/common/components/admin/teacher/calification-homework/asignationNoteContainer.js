 //el container es el encargado de conecar nuestros componentes con redux
 import { connect } from 'react-redux';
 //los actions son todas las funciones que están en el archivo de redux perteneciente a este modulo (redux/teacher.js)
 import { actions } from '../../../../../redux/modules/admin/teacher/homework';
 import AsignationNoteHomeworkStudent from './asignationNote';
 
 const ms2p = (state) => {
   return {
     ...state.homework,
   };
 };
 const md2p = { ...actions };
 
 export default connect(ms2p, md2p)(AsignationNoteHomeworkStudent);