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
const SEARCH = 'SEARCH'
const endpoint = '/asignation'
const formName = 'asignationForm'

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

// -----------------------------------
// Actions
// -----------------------------------

export const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore()[storeId];
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;

    dispatch(setLoader(true));

    api.get(endpoint, params).then((response) => {
        
        dispatch(setData(response));

        
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const listAsignationTeacher = (page=1) => (dispatch, getStore) =>{
    //const resource = getStore()[storeId];
    const params = { page };
    //params.ordering = resource.ordering;
    //params.search = resource.search;
    dispatch(setLoader(true));
    
    const id_perfil = getStore().form.profile.values.profile.id
    api.get(`/asignation-teacher/${id_perfil}`, params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
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

export const leer = id => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/${id}`).then((response) => {
        
        const schoolCycle = {
            value: response.schoolCycle.id,
            label: response.schoolCycle.anio
        }

        const course = {
            value: response.course.id,
            label: response.course.name
        }
        const section = {
            value: response.section.id,
            label: response.section.name
        }
        const grade = {
            value: response.grade.id,
            label: response.grade.name
        }

        const teacher = {
            value: response.teacher.id,
            label: response.teacher.value
        }
        response.schoolCycle = schoolCycle
        response.course = course
        response.section = section
        response.grade=grade
        response.teacher=teacher
        
        dispatch(setItem(response));
        if (!!formName)
            dispatch(initializeForm(formName, response));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const clearItem = () => (dispatch) => {
    dispatch(setItem(null))
}

export const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`${endpoint}/${id}`).then(() => {
        dispatch(listar());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
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


export const actions = {
    listar,
    leer,
    eliminar,
    searchChange,
    onSortChange,
    clearItem,
    listAsignationTeacher,
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
    search: ''
};

export default handleActions(reducers, initialState)