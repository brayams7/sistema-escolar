import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {api} from 'api'
import {
    AsyncSelectField,
}  from "Utils/renderField/renderField";
import { element } from 'prop-types';

class TeacherForm extends Component {
    
    render() {
        const {handleSubmit} = this.props

        const listProfessions = (search) => {
            let professions = [];
            return api.get("/profession", { search })
                .then((response) => {
                    professions = response.results.map((element) => ({
                        value: element.id,
                        label: element.name,
                    }));
                    console.log("profesiones",professions)
                    return professions;
                })
                .catch((err) => {
                    return professions;
                });
        };
        
        return (
            <form name="teacher" className="form-validate" onSubmit={handleSubmit}>
                <div className="form-group has-feedback">
                    <label htmlFor="first_name">Nombre</label>
                    <Field name = "first_name" label="first_name" component={renderField} type="text" className="form-control"/>
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="last_name">Apellido</label>
                    <Field name="last_name" label="Apellido" component={renderField} type="text" className="form-control"/>
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="email">Email</label>
                    <Field name="email" label="email" component={renderField} type="email" className="form-control"/>
                </div>
                
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
                        label="Confirmar Contraseña"
                        component={renderField}
                        type="password"
                        className="form-control"
                    />
                </div>
                
                <div className="form-group has-feedback">
                    <label htmlFor="address">Direccion</label>
                    <Field name="address" label="address" component={renderField} type="text" className="form-control"/>
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="phone">Telefono</label>
                    <Field name="phone" label="phone" component={renderField} type="text" className="form-control"/>
                </div>
                 
                <div className="form-group has-feedback">
                    <Field
                        name="profession"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listProfessions}
                        type="text"
                    
                    />
                </div>
                
                <div className="buttons-box">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar Catedrático</button>
                </div>
                
            </form>
        );
    }
}


export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm
});

export default reduxForm({
    form: 'teacher', // nombre del registro de formulario para catedráticos
    validate: (data) => {
        return validate(data, {
            password_confirmation: combine(
                validators.exists()('Este campo es requerido'),
                matchPassword(data.password, data.password_confirmation)()('Las contraseñas no coinciden')
             ),
            name: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            email: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
            address: validators.exists()('Este campo es requerido'),
            phone: validators.exists()('Este campo es requerido')
        });
    },
})(TeacherForm);