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
const LIST_ASIGNATION_TEACHER = 'LIST_ASIGNATION_TEACHER'

const endpoint = '/asignation'
const resourceList = '/asignation'
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

export const list = (page = 1) => (dispatch, getStore) => {
    //const resource = getStore()[storeId];
    const params = { page };
    //params.ordering = resource.ordering;
    //params.search = resource.search;

    dispatch(setLoader(true));

    api.get('/asignation', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
        console.log('hola', response)
    }).catch(() => {
        NotificationManager.error(
            'Ocurrio un error al listar las profesiones',
            'ERROR',
            0
        )
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const listTeacherAsignations = (id, page=1) => (dispatch) =>{
    //const resource = getStore()[storeId];
    const params = { page };
    //params.ordering = resource.ordering;
    //params.search = resource.search;
    dispatch(setLoader(true));
    api.get(`/asignation-teacher/${id}`, params).then((response) => {
        dispatch({type:LIST_ASIGNATION_TEACHER, dataAsignationTeacher:response});
        dispatch(setPage(page));
    }).catch(() => {
        NotificationManager.error(
            'Ocurrio un error al listar las profesiones',
            'ERROR',
            0
        )
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const leer = id => (dispatch) => {
    dispatch(setLoader(true));
    console.log('hola mundo')
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
export const crear = (data, avatar) => (dispatch) => {
    dispatch(setLoader(true));
    
    console.log('avatar', avatar)

    const newData = {
        ...data,
        schoolCycle : data.schoolCycle.value,
        grade : data.grade.value,
        section : data.section.value,
        course : data.course.value,
        teacher : data.teacher.value,
    }
    api.postAttachments(endpoint, newData, avatar).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        if (!!resourceList) 
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const editar = (id, data, avatar) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.putAttachments(`${endpoint}/${id}`, data, avatar).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

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

export const listAnio = (search) => (dispatch) => {
    let data = [];
    return api.get('/cycleSchool', { search })
        .then((response) => {
            data = response.results.map((element) => ({
                value: element.id,
                label: element.anio,
            }));
            return data;
        })
        .catch((err) => {
            return data;
        });
};
export const listCourse = (search) => (dispatch) => {
    let data = [];
    return api.get('/course', { search })
        .then((response) => {
            data = response.results.map((element) => ({
                value: element.id,
                label: element.name,
            }));
            return data;
        })
        .catch((err) => {
            return data;
        });
};

export const listSection = (search) => (dispatch) => {
    let data = [];
    return api.get('/section', { search })
        .then((response) => {
            data = response.results.map((element) => ({
                value: element.id,
                label: element.name,
            }));
            return data;
        })
        .catch((err) => {
            return data;
        });
};

export const listGrade = (search) => (dispatch) => {
    let data = [];
    return api.get('/grade', { search })
        .then((response) => {
            data = response.results.map((element) => ({
                value: element.id,
                label: element.name,
            }));
            return data;
        })
        .catch((err) => {
            return data;
        });
};

export const listTeacher = (search) => (dispatch) => {
    let data = [];
    return api.get('/teacher', { search })
        .then((response) => {
            console.log('teacher',response)
            data = response.results.map((element) => ({
                value: element.id,
                label: element.profile,
            }));
            return data;
        })
        .catch((err) => {
            return data;
        });
};

export const actions = {
    listar,
    leer,
    crear,
    editar,
    eliminar,
    searchChange,
    onSortChange,
    listGrade,
    listSection,
    listTeacher,
    listAnio,
    listCourse,
    list,
    clearItem,
    listTeacherAsignations,
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
    [LIST_ASIGNATION_TEACHER]: (state, { dataAsignationTeacher }) => {
        return {
            ...state,
            dataAsignationTeacher,
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
    dataAsignationTeacher: {
        results: [],
        count:0
    }
};

export default handleActions(reducers, initialState)