import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import PasswordForm from './passwordForm';
import LoadMask from "Utils/LoadMask/LoadMask";

class ChangePassword extends Component {

    constructor(props){
        super(props)
        this.state={
            is_recover_password:false
        }
    }


    render() {
        const { changeFirstPassword, loader, match, changePassword} = this.props;
        const id_user = match.params.id
        console.log(id_user)
        console.log('props__', this.props)
        const jwt = match.params.token


        if (id_user){
            return (
                <div className="blue-gradient-bg">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center">hola mundo</h1>
                        <p>Cambio de contraseña</p>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-lg-3 col-md-4 col-11">
                            <h5 className="text-center pv">INGRESAR</h5>
                            <LoadMask loading={loader} light>
                                <PasswordForm onSubmit={changeFirstPassword} initialValues={{id: id_user}} context={false}/>
                            </LoadMask>
                        </div>
                    </div>
                </div>
                );
            
        }else if(jwt){
            return (
                <div className="blue-gradient-bg">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center">Bienvenido</h1>
                        <p>Cambio de contraseña</p>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-lg-3 col-md-4 col-11">
                            <h5 className="text-center pv">INGRESAR</h5>
                            <LoadMask loading={loader} light>
                                <PasswordForm onSubmit={changePassword} initialValues={{token: jwt}} context={true}/>
                            </LoadMask>
                        </div>
                    </div>
                </div>
                );
            
        }
        
    }   
}

export default ChangePassword;
