import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { checkPropTypes } from 'prop-types';

const LOADER = 'LOADER'
const DATA = 'DATA'
const ITEM = 'ITEM'
const PAGE = 'PAGE'
const ORDERING = 'ORDERING'
const SEARCH = 'SEARCH'
const SETSTUDENTS = 'SETSTUDENTS'
const endpoint = '/list-student-assigned'
const resourceList = '/asignation'


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

export const setStudentNotAssigned = students => (
    {
        type: SETSTUDENTS,
        studentsNotAssigned:students,
    }
)

// -----------------------------------
// Actions
// -----------------------------------

export const listarEstudiantesAsignados = (id, page = 1) => (dispatch, getStore) => {

    //const resource = getStore()[storeId];
    const params = { page };
    //params.ordering = resource.ordering;
    //params.search = resource.search;

    dispatch(setLoader(true));
    api.get(`${endpoint}/${id}`, params).then((response) => {
        console.log(response);
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


export const listStudentNotAssinged = (id=0) => (dispatch, getStore) => {
    let students = [];
        return api.get(`/asignation-student/${id}`)
        .then((response) => {
            students = response.results.map((element) => ({
                value: element.id,
                label: element.profile,
        }));
        
        dispatch({type: SETSTUDENTS, students: students})
        return students
        })
        .catch((err) => {
        dispatch({type: SETSTUDENTS, students: students})
        return students
        });    
};

const clearItem = () => (dispatch) => {
    dispatch(setItem(null))
}

export const asignarEstudiante = (data) => (dispatch) => {
    dispatch(setLoader(true));
    console.log(data)
    api.post('/asignation-student', data).then(() => {
        NotificationManager.success('Estudiante asignado', 'Éxito', 3000);
        if (!!resourceList) 
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
    
};


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

const darDeBajaEstudiante = (id_asignation, id_estudent=0) => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`/delete-student-asignation/${id_estudent}/${id_asignation}`).then(() => {
        dispatch(listar());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const actions = {
    listarEstudiantesAsignados,
    asignarEstudiante,
    searchChange,
    onSortChange,
    clearItem,
    listStudentNotAssinged,
    darDeBajaEstudiante
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
    [SETSTUDENTS] : (state, {students}) => {
        return {
            ...state,
            studentsNotAssigned: students,
        }
    }
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
    studentsNotAssigned:[]
};

export default handleActions(reducers, initialState)