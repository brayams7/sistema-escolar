//el container es el encargado de conecar nuestros componentes con redux
import { connect } from 'react-redux';
//los actions son todas las funciones que están en el archivo de redux perteneciente a este modulo (redux/teacher.js)
import { actions } from '../../../redux/modules/eventos/evento';
import EventRegister from './eventRegister';

const ms2p = (state) => {
  return {
    ...state.event,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(EventRegister);