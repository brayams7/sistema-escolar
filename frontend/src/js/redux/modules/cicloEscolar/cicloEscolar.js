import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "cycleSchool",
    "cycleSchool",
    "cycleSchoolForm",
    "/cycleSchool",
);

export default handleActions(reducers, initialState);