import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "event",
    "event",
    "eventForm",
    "/event",
);

export default handleActions(reducers, initialState);