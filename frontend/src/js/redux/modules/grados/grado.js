import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "grade",
    "grade",
    "gradeForm",
    "/grades",
    '/level', // endpoint para los niveles de un grado
);

export default handleActions(reducers, initialState);