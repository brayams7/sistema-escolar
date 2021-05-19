import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'LOGIN_SUBMIT';
const LOADER = 'LOGIN_LOADER';
const ME = 'LOGIN_ME';
const SEND_MAIL = 'SEND_MAIL'

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setMe = me => ({
    type: ME,
    me,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.post('user/token', data).then((response) => {
        localStorage.setItem('token', response.token);
        dispatch(initializeForm('profile', response.user));
        dispatch(setMe(response.user));
        console.log(getStore())
        if (getStore().login.me.profile.password_change == true){
            dispatch(push("/"));
        }else{
            const id = getStore().login.me.profile.user
            dispatch(push(`/change-password/${id}`))
        }
            
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const getMe = () => (dispatch, getStore) => {
    console.log('props profile',getStore())
    api.get('/user/me').then(me => {
        dispatch(initializeForm('profile', me));
        dispatch(setMe(me));
    })
        .catch(() => {
    }).finally(() => {});
};

export const logOut = () => (dispatch) => {
    api.post('/user/logout').then(() => {
    }).catch(() => {
    }).finally(() => {});
    localStorage.removeItem('token');
};

export const changeFirstPassword = () => (dispatch, getStore) =>{
    dispatch(setLoader(false));
    console.log('edit',getStore())

    const data = getStore().form.changePasswordForm.values
    const id = data.id
    api.put(`/change-password/${id}`, data).then((response)=>{
        dispatch(push("/"));
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
}


//recuperacion de contraseña
export const sendEmailUser = () => (dispatch, getStore) =>{
    dispatch(setLoader(true))
    const data = getStore().form.emailRecoverForm.values
    api.post('/recover-password', data).then((response) => {
        console.log(getStore())
        NotificationManager.success('Se le envió un sms a su correo', 'CORREO VALIDO', 3000)
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

//cambio de contraseña olvidada
export const changePassword = () => (dispatch, getStore) =>{
    dispatch(setLoader(false));
    //console.log('edit',getStore())

    const data = getStore().form.changePasswordForm.values
    console.log('data',data)
    api.post(`/change-password`, data).then((response)=>{
        dispatch(push("/login"));
        NotificationManager.success('su contraseña fue cambiada satisfactoriamente', 'CORREO VALIDO', 3000)

    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const actions = {
    onSubmit,
    logOut,
    changeFirstPassword,
    sendEmailUser,
    changePassword,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [ME]: (state, { me }) => {
        return {
            ...state,
            me,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
};

export default handleActions(reducers, initialState);
