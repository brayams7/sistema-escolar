import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'

const CourseForm = (props) => {
    const {handleSubmit, crear} = props
    let disabled = false
    const ver =  window.location.href.includes('ver')
    if(ver){
        disabled = true
    }
    return (
        <form name="professionForm" className="form-validate" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="name">Nombre</label>
                <Field name = "name" label="name" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="description">descripcion</label>
                <Field name="description" label="description" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>
            
            {disabled == false &&
                <div className="buttons-box">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">
                        {crear == true ? 'registrar' :
                            'actualizar'
                        }
                        </button>
                    <input type="reset" className="btn btn-danger m-1 align-self-center"/>
                </div>
            }

        </form>
    );
};

export default reduxForm({
    form: 'courseForm', // nombre del registro de formulario para los niveles
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
        });
    },
})(CourseForm);