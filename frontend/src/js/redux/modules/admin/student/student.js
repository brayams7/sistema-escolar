import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
//import { reducers } from '../../cuenta/login';


//constante para alterar el estado del formulario de catedraticos
const LIST_STUDENT = 'LIST_STUDENT';
//cracion de acciones
//getStore se refiere al estado que contiene redux
const GET_UNIQUE_STUDENT = 'GET_UNIQUE_STUDENT'
const SET_LOADER_STUDENT  = 'SET_LOADER_STUDENT'
let endpoint = '/student';
//cracion de acciones
//getStore se refiere al estado que contiene redux
export const registerStudent = () => (dispatch, getStore) =>{
    const data = getStore().form.student.values
    console.log(data)
    const newData = {
        ...data,
        grade: data.grade.value
    }
    
    console.log('new data',newData) 
    api.post(endpoint, newData).then((response)=>{
        NotificationManager.success(
            'Catedrático creador',
            'Exito',
            3000
        )
        dispatch({
            type: SET_LOADER_STUDENT,
            loader: true
        })
        dispatch(push(endpoint))
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'Catedrático creador',
            'ERROR',
            0
        )
    }).finally(()=>{
        dispatch({
            type: SET_LOADER_STUDENT,
            loader: false
        })
    })
}
//listado de catedráticos
export const listStudent = (page=1) => (dispatch) =>{
    const params = {page}
    dispatch({
        type: SET_LOADER_STUDENT,
        loader: true
    })
    api.get(endpoint, params).then((response) =>{
        console.log('studentsdf', response)
        //agregando los datos al state
        dispatch({type:LIST_STUDENT, data:response})
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'Ocurrio un error al listar las profesiones',
            'ERROR',
            0
        )
    }).finally(()=>{
        dispatch({
            type: SET_LOADER_STUDENT,
            loader: false
        })
    })
}

export const listGrade = (search) => (dispatch) =>{
    let grados = [];
        return api.get("/grade", { search })
            .then((response) => {
                grados = response.results.map((element) => ({
                    value: element.id,
                    label: element.name,
                }));
                return grados;
            })
            .catch((err) => {
                return grados;
            });
}
export const getStudent = (id) => (dispatch) =>{
    dispatch({
        type: SET_LOADER_STUDENT,
        loader: true
    })
    api.get(`${endpoint}/${id}`).then((response)=>{
      console.log('student', response)
      dispatch({
          type:GET_UNIQUE_STUDENT,
          getObject:response
      })
      //inicializando el formulario con inicialize form
      dispatch(initializeForm('setStudentForm', response))
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'error al mostrar el catedrático',
            'ERROR',
            0
        )
    }).finally(()=>{
        dispatch({
            type: SET_LOADER_STUDENT,
            loader: false
        })
    })
}
export const getTeacher = (id) => (dispatch) =>{
    dispatch({
        type: SET_LOADER_TEACHER,
        loader: true
    })
    api.get(`/teacher/${id}`).then((response)=>{
      console.log('techaer', response)
      dispatch({
          type:GET_UNIQUE_TEACHER,
          getObject:response
      })
      //inicializando el formulario con inicialize form
      dispatch(initializeForm('setTeacherForm', response))   
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'error al mostrar el catedrático',
            'ERROR',
            0
        )
    }).finally(()=>{
        dispatch({
            type: SET_LOADER_TEACHER,
            loader: false
        })
    })
}
export const editStudent = () => (dispatch, getStore) =>{
    dispatch({
        type: SET_LOADER_STUDENT,
        loader: true
    })
    const data = getStore().form.setStudentForm.values
    const id = getStore().student.getObject.id

    api.put(`${endpoint}/${id}`, data).then((response)=>{
        NotificationManager.success(
            'se editó correctamente',
            'Exito',
            3000
        )
        //inicializando el formulario con inicialize form
        dispatch(push(endpoint))
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'error al editar el estudiante',
            'ERROR',
            0
        )
    }).finally(()=>{
        dispatch({
            type: SET_LOADER_STUDENT,
            loader: false
        })
    })
}
//para conectar nuestros componentes con redux tenemos que exportar nuestar acciones (funcione)
export const actions = {
    registerStudent,
    listStudent,
    getStudent,
    editStudent,
    listGrade,
};

//inicializar el estado inicial 
export const initialState = {
    loader: false,
    data : [],
    page : 1,
    ordering: '',
    getObject: null,
};
//son los que van a cambiar el estado
export const reducers = {   
    [LIST_STUDENT]: (state, {data}) =>{
        return{
            ...state,
            data:data,
        };
    },
    [GET_UNIQUE_STUDENT]: (state, {getObject} ) =>{
        return{
            ...state,
            getObject:getObject,
        };
    },
    [SET_LOADER_STUDENT]: (state, {loader}) =>{
        return{
            ...state,
            loader:loader,
        };
    },
};

export default handleActions(reducers, initialState)