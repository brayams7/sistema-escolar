import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "section",
    "section",
    "sectionForm",
    "/section",
);

export default handleActions(reducers, initialState);