import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoadMask from "Utils/LoadMask/LoadMask";
import RecoverPasswordForm from './recoverPasswordForm'

class RecoverPasswordUser extends Component {
    render() {
        const {loader,sendEmailUser} = this.props;
        console.log('props__', this.props)
        return (
                <div className="color-body">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center">Recuperacion de contraseña</h1>
                        <p>Cambio de contraseña</p>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-lg-3 col-md-4 col-11">
                            <h5 className="text-center pv">INGRESAR</h5>
                            <LoadMask loading={loader} light>
                                <RecoverPasswordForm onSubmit={sendEmailUser}/>
                            </LoadMask>
                        </div>
                    </div>
                </div>
            );
        }
}

export default RecoverPasswordUser;
