import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { get } from 'lodash';

//constante para alterar el estado del formulario de catedraticos
const LIST_TEACHER = 'LIST_TEACHER';
//cracion de acciones
//getStore se refiere al estado que contiene redux
const GET_UNIQUE_TEACHER = 'GET_UNIQUE_TEACHER'
const SET_LOADER_TEACHER  = 'SET_LOADER_TEACHER'

export const registerTeacher = () => (dispatch, getStore) =>{
    const data = getStore().form.teacher.values
    console.log(data)
    const newData = {
        ...data,
        profession:data.profession.value
    }
    console.log('new data',newData) 
    
    api.post('/teacher', newData).then((response)=>{
        NotificationManager.success(
            'Catedrático creador',
            'Exito',
            3000
        )
        dispatch({
            type: SET_LOADER_TEACHER,
            loader: true
        })
        dispatch(push('/teacher'))
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'Catedrático creador',
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
//listado de catedráticos
export const listTeacher = (page=1) => (dispatch) =>{
    const params = {page}
    dispatch({
        type: SET_LOADER_TEACHER,
        loader: true
    })
    api.get('/teacher', params).then((response) =>{
        //agregando los datos al state
        dispatch({type:LIST_TEACHER, data:response})
        console.log(response)
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'Ocurrio un error al listar las profesiones',
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
      const profession = {
          value:response.profession.id,
          label: response.profession.name
      }
      response.profession = profession
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
export const editTeacher = () => (dispatch, getStore) =>{
    dispatch({
        type: SET_LOADER_TEACHER,
        loader: true
    })
    const data = getStore().form.setTeacherForm.values
    const newData = {
        ...data,
        profession: data.profession.value
    }
    const id = getStore().teacher.getObject.id

    api.put(`/teacher/${id}`, newData).then((response)=>{
        NotificationManager.success(
            'se editó correctamente',
            'Exito',
            3000
        )
        //inicializando el formulario con inicialize form
      dispatch(initializeForm('teacher', response))
        dispatch(push('/teacher'))
    }).catch((error)=>{
        console.log('error',error)
        NotificationManager.error(
            'error al editar el catedrático',
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
//para conectar nuestros componentes con redux tenemos que exportar nuestar acciones (funcione)
export const actions = {
    registerTeacher,
    listTeacher,
    getTeacher,
    editTeacher,
};

//son los que van a cambiar el estado

export const reducers = {   
    [LIST_TEACHER]: (state, {data}) =>{
        return{
            ...state,
            data:data,
        };
    },
    [GET_UNIQUE_TEACHER]: (state, {getObject} ) =>{
        return{
            ...state,
            getObject:getObject,
        };
    },
    [SET_LOADER_TEACHER]: (state, {loader}) =>{
        return{
            ...state,
            loader:loader,
        };
    },
};

//inicializar el estado inicial 
export const initialState = {
    loader: false,
    data : [],
    page : 1,
    ordering: '',
    getObject: null,
};


export default handleActions(reducers, initialState)