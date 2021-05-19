import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "course",
    "course",
    "courseForm",
    "/course",
);

export default handleActions(reducers, initialState);