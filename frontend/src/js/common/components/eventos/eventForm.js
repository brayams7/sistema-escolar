import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {api} from 'api'
import {
    AsyncSelectField,
}  from "Utils/renderField/renderField";

const EventForm = (props) => {
    const {handleSubmit, crear} = props
    let disabled = false
    const ver =  window.location.href.includes('ver')
    if(ver){
        disabled = true
    }

    const listDataSecondary = (search) =>{
        let data = [];
        return api.get('/cycleSchool', { search })
            .then((response) => {
                data = response.results.map((element) => ({
                    value: element.id,
                    label: element.anio,
                }));
                return data;
            })
            .catch((err) => {
                return data;
            });
    };

    return (
        <form name="professionForm" className="form-validate" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="title">Titulo</label>
                <Field name = "title" label="title" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>
            
            <div className="form-group has-feedback">
                <label htmlFor="description">descripcion</label>
                <Field name="description" label="description" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="date">Fecha estipulada</label>
                <Field name="date" label="date" component={renderField} type="date" className="form-control" disabled={disabled}/>
            </div>
            <div className="form-group has-feedback">
                    <Field
                        name="anio"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listDataSecondary}
                        type="text"
                    />
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
    form: 'eventForm', // nombre del registro de formulario para los eventos
    validate: (data) => {
        return validate(data, {
            title: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
            date: validators.exists()('Este campo es requerido'),
        });
    },
})(EventForm);