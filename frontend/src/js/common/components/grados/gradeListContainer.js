//el container es el encargado de conecar nuestros componentes con redux
import { connect } from 'react-redux';
//los actions son todas las funciones que están en el archivo de redux perteneciente a este modulo (redux/teacher.js)
import { actions } from '../../../redux/modules/grados/grado';
import ListGrade from './gradeList';

const ms2p = (state) => {
  return {
    ...state.grade,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListGrade);