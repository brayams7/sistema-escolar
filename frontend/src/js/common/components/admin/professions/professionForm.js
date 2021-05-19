import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'

const ProfessionForm = (props) => {
    const {handleSubmit} = props
    return (
        <form name="professionForm" className="form-validate" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="name">Nombre</label>
                <Field name = "name" label="name" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="decription">descripcion</label>
                <Field name="decription" label="decription" component={renderField} type="text" className="form-control" />
            </div>
            
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar Catedrático</button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'professionForm', // nombre del registro de formulario para catedráticos
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
        });
    },
})(ProfessionForm);