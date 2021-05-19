import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const LOADER = 'LOADER'
const LEVEL = 'LEVEL'
const ITEM = 'ITEM'
const PAGE = 'PAGE'
const ORDERING = 'ORDERING'
const SEARCH = 'SEARCH'
const ANIO = 'ANIO'
const STUDENTS = 'STUDENTS'
const USERS = 'USERS'
const TEACHERS = 'TEACHERS'
const SECTIONS = 'SECTIONS'
const GRADES = 'GRADE'


const endpoint = '/dashboard-admin'
const formName = 'materialForm'

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setLevel = levels => ({
    type: LEVEL,
    levels,
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

const leerCicloEscolar = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/getCycleSchool`).then((response) => {
        dispatch({type : ANIO, anio: response})
        console.log('get anio', response)
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const totalUsuarios = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/getTotalUsers`).then((response) => {
        dispatch({type : USERS, users: response})
        console.log('get usuarios', response)
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const totalEstudiantes = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/getTotalStudents`).then((response) => {
        dispatch({type : STUDENTS, students: response})
        console.log('get students', response)
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const totalCatedraticos = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/getTotalTeachers`).then((response) => {
        dispatch({type : TEACHERS, teachers: response})
        console.log('get students', response)
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const listarNiveles = (page = 1) => (dispatch, getStore) => {
    const resource = getStore();
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch(setLoader(true));
    api.get(`${endpoint}/getLevels`, params).then((response) => {
        dispatch(setLevel(response));
        dispatch(setPage(page));
        console.log('levels', response)
        
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const totalGrados = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/getTotalGrades`).then((response) => {
        dispatch({type : GRADES, grades: response})
        console.log('get GRADES', response)
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const totalSecciones = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/getTotalSections`).then((response) => {
        dispatch({type : SECTIONS, sections: response})
        console.log('get secciones', response)
    }).catch(() => {
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
    searchChange,
    onSortChange,
    clearItem,
    leer,
    listarNiveles,
    totalCatedraticos,
    totalEstudiantes,
    totalGrados,
    totalSecciones,
    leerCicloEscolar,
    totalUsuarios
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [LEVEL]: (state, { levels }) => {
        return {
            ...state,
            levels,
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
    [ANIO]: (state, { anio }) => {
        return {
            ...state,
            anio,
        };
    },
    [USERS]: (state, { users }) => {
        return {
            ...state,
            users,
        };
    },
    [STUDENTS]: (state, { students }) => {
        return {
            ...state,
            students,
        };
    },
    [TEACHERS]: (state, { teachers }) => {
        return {
            ...state,
            teachers,
        };
    },
    [GRADES]: (state, { grades }) => {
        return {
            ...state,
            grades,
        };
    },
    [SECTIONS]: (state, { sections }) => {
        return {
            ...state,
            sections,
        };
    },
};

export const initialState = {
    loader: false,
    levels: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
    anio:{},
    users: 0,
    students : 0,
    teachers:0,
    grades: 0,
    sections: 0
};

export default handleActions(reducers, initialState)