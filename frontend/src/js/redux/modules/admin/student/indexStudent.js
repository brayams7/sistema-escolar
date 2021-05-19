import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LOADER = 'LOADER'
const DATA = 'DATA'
const ITEM = 'ITEM'
const PAGE = 'PAGE'
const ORDERING = 'ORDERING'
const EVENTS = 'EVENTS'
const SEARCH = 'SEARCH'
const HOMEWORKS = 'HOMEWORKS'
const endpoint = '/dashboard-student'

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setData = data => ({
    type: DATA,
    data,
});

export const setItem = item => ({
    type: ITEM,
    item,
});

export const setPage = page => ({
    type: PAGE,
    page,
});

export const setOrdering = ordering => ({
    type: ORDERING,
    ordering,
});

export const setSearch = search => ({
    type: SEARCH,
    search,
});



export const listCoursesStudent = (page=1) => (dispatch, getStore) =>{
    //const resource = getStore()[storeId];
    const params = { page };
    //params.ordering = resource.ordering;
    //params.search = resource.search;
    dispatch(setLoader(true));
    api.get(`${endpoint}/cursosAsignados`, params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
        console.log('cursos', response)
        
    }).catch(() => {
        NotificationManager.error(
            'Ocurrio un error al listar los cursos',
            'ERROR',
            0
        )
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const listarTareas = (page=1) => (dispatch, getStore) =>{
    //const resource = getStore()[storeId];
    const params = { page };
    //params.ordering = resource.ordering;
    //params.search = resource.search;
    dispatch(setLoader(true));
    api.get(`${endpoint}/traerTareasProximar`, params).then((response) => {
        dispatch({type : HOMEWORKS, homeworks:response});
        dispatch(setPage(page));
        console.log('tareas', response)
    }).catch(() => {
        NotificationManager.error(
            'Ocurrio un error al listar los cursos',
            'ERROR',
            0
        )
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const listarEventos = (page=1) => (dispatch, getStore) =>{
    //const resource = getStore()[storeId];
    const params = { page };
    //params.ordering = resource.ordering;
    //params.search = resource.search;
    dispatch(setLoader(true));
    api.get(`${endpoint}/getEvents`, params).then((response) => {
        dispatch({type: EVENTS, events:response});
        dispatch(setPage(page));
        console.log('eventos', response)
    }).catch(() => {
        NotificationManager.error(
            'Ocurrio un error al listar los cursos',
            'ERROR',
            0
        )
    }).finally(() => {
        dispatch(setLoader(false));
    });
}
export const searchChange = search => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

export const onSortChange = ordering => (dispatch, getStore) => {
    const sort = getStore()[storeId].ordering;
    if (ordering === sort) {
        dispatch(setOrdering(`-${ordering}`));
    } else {
        dispatch(setOrdering(ordering));
    }
    dispatch(listar());
};


export const actions = {
    searchChange,
    onSortChange,
    listCoursesStudent,
    listarEventos,
    listarTareas,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [ITEM]: (state, { item }) => {
        return {
            ...state,
            item,
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [ORDERING]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },
    [EVENTS]: (state, { events }) => {
        return {
            ...state,
            events,
        };
    },
    [HOMEWORKS]: (state, { homeworks }) => {
        return {
            ...state,
            homeworks,
        };
    },
};

export const initialState = {
    loader: false,
    data: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
    homeworks: {
        results: [],
        count: 0,
    },
    events: {
        results: [],
        count: 0,
    },
    homeworks: {
        results: [],
        count: 0,
    },
};

export default handleActions(reducers, initialState)