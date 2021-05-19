import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "level",
    "level",
    "levelForm",
    "/level",
);

export default handleActions(reducers, initialState);