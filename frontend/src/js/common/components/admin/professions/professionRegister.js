import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoadMask from "../../Utils/LoadMask/LoadMask";
import ProfessionForm from './professionForm'

class RegisterProfession extends Component {

    render() {
        const {crear,loader} = this.props
        console.log(this.props)

        
        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">Registrar una profesion</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">NUEVO</h5>
                            <ProfessionForm onSubmit={crear} loader={loader}/>  
                    </div>
                </div>
            </div>
        )
        
    }
}

export default RegisterProfession;