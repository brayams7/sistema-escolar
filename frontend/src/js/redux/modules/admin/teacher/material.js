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
const SET_ROL = 'SET_ROL'
const endpoint = '/material-class'
const resourceList = '/material'
const formName = 'materialForm'

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
        console.log(response)
        let rol = null
        if (response.results.length != 0){
            rol = response.results[0].rol
        }
        dispatch({type : SET_ROL, rol:rol})
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const leer = (id_asignation, id_material) => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`retrieve-material/${id_asignation}/${id_material}`).then((response) => {
        dispatch(setItem(response));
        if (!!formName)
            dispatch(initializeForm(formName, response));
        console.log('get material', response)
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const crear = (data, directory_field) => (dispatch) => {
    dispatch(setLoader(true));
    console.log('data',data)
    console.log('directory_field', directory_field)
    
    api.postAttachments(endpoint, data, directory_field).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        if (!!resourceList) 
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const editar = (id, data, directory_field) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    console.log(data)
    console.log(directory_field)
    
    api.putAttachments(`${endpoint}/${id}`, data, directory_field).then(() => {
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
    [SET_ROL]: (state, { rol }) => {
        return {
            ...state,
            rol,
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
    rol : null,
};

export default handleActions(reducers, initialState)