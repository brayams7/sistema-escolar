//el container es el encargado de conecar nuestros componentes con redux
import { connect } from 'react-redux';
//los actions son todas las funciones que están en el archivo de redux perteneciente a este modulo (redux/teacher.js)
import { actions } from '../../../redux/modules/Cursos/curso';
import CourseList from './courseList';

const ms2p = (state) => {
  return {
    ...state.course,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CourseList);