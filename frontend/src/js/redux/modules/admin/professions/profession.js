import {handleActions} from 'redux-actions';
import {createReducer} from "../../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "profession", //identificador para para usarlo dentro del estado
    "profession", //endpoint para realizar las peticione
    "professionForm", //formulario
    "profession", //pagina a donde va a redirigir cuando se termine de realizar un metodo
);

export default handleActions(reducers, initialState);
