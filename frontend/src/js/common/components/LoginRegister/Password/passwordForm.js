import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';

const PasswordForm = (props) => {
    const { handleSubmit, context} = props;
    //falta agregar el else y un field para agregar el token del usuario
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            {context == false ?
                <Field
                    name="id"
                    component='input'
                    type="hidden"
                />
            :   <Field
                    name="token"
                    component='input'
                    type="hidden"
                />
            }
            <div className="form-group has-feedback">
                    <label htmlFor="password">Contraseña</label>
                    <Field
                        name="password"
                        label="Contraseña"
                        component={renderField}
                        type="password"
                        className="form-control"
                    />
                    
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="password_confirmation">Confirmar Contraseña</label>
                    <Field
                        name="password_confirmation"
                        label="Confirmar"
                        component={renderField}
                        type="password"
                        className="form-control"
                    />
                </div>
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Cambiar</button>
            </div>
        </form>
    );
};


export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'changePasswordForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(PasswordForm);
