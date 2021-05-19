import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';

const RecoverPasswordForm = (props) => {
    const { handleSubmit} = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>      
            <div className="form-group has-feedback">
                    <label htmlFor="email">Ingrese su correo electrónico</label>
                    <Field
                        name="email"
                        label="email"
                        component={renderField}
                        type="email"
                        className="form-control"
                    />
            </div>

            <div className="row">
                <div className= "col-md-6 text-center buttons-box">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">Enviar</button>
                </div>
                <div className="col-md-6 buttons-box">
                    <Link to="/login" className="btn btn-danger m-1 align-self-center" tabindex="-1" role="button" aria-disabled="true">login</Link>
                </div>
            </div>
            
        </form>
    );
};


export default reduxForm({
    form: 'emailRecoverForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            email: validators.exists()('Este campo es requerido'),
        });
    },
})(RecoverPasswordForm);