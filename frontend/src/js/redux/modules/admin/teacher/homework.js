import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { checkPropTypes } from 'prop-types';
import { get } from 'lodash';

const LOADER = 'LOADER'
const DATA = 'DATA'
const ITEM = 'ITEM'
const PAGE = 'PAGE'
const ORDERING = 'ORDERING'
const SEARCH = 'SEARCH'
const SETITEMTAREA = 'SETITEMTAREA'
const endpoint = '/homework'
const resourceList = '/homework'
const formName = 'homeworkForm'

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

const listar = (id, page = 1) => (dispatch, getStore) => {
    const resource = getStore();
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch(setLoader(true));
    api.get(`${endpoint}/${id}`, params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const leer = (id_asignation, id_material) => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`retrieve-homework/${id_asignation}/${id_material}`).then((response) => {
        dispatch(setItem(response));
        if (!!formName)
            dispatch(initializeForm(formName, response));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const crear = (data, field) => (dispatch) => {
    dispatch(setLoader(true));
    console.log('data',data)
    console.log('field', field)
    
    api.postAttachments(endpoint, data, field).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        if (!!resourceList) 
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
    
};

export const editar = (id, data, field) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.putAttachments(`${endpoint}/${id}`, data, field).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};
//metodos de asigancion de notas

const leerTareaEstudiante = (id_homework_student) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    console.log('get store tarea est', getStore())
    api.get(`/calification-homework/${id_homework_student}`).then((response) => {
        console.log('detalle tarea', response)
        dispatch(initializeForm('asignationNoteForm', response));
        dispatch({type: SETITEMTAREA, itemTarea: response});
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const leerItemTarea = (id_homework) => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/traerDetalleTarea/`,{id_tarea: id_homework}).then((response) => {
        dispatch({type:SETITEMTAREA, itemTarea:response})
        console.log('item tarea', response)
        dispatch(initializeForm(formName, response));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const listarTareasEntregadas = (id_homework, page = 1) => (dispatch, getStore) => {
    const resource = getStore();
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch(setLoader(true));
    api.get(`/calification-homework/listar_tareas_entregadas`, {id_homework:id_homework}).then((response) => {
        console.log('data', response)
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const editarNota = (id_homework_student, data) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.put(`/calification-homework/${id_homework_student}`,data).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const clearItem = () => (dispatch) => {
    dispatch(setItem(null))
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
    listar,
    crear,
    editar,
    searchChange,
    onSortChange,
    clearItem,
    leer,
    listarTareasEntregadas,
    leerTareaEstudiante,
    editarNota
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
    [SETITEMTAREA]: (state, { itemTarea }) => {
        return {
            ...state,
            itemTarea,
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
    itemTarea:{}
};

export default handleActions(reducers, initialState)