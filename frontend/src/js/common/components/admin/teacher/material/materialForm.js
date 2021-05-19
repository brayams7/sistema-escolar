import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField} from '../../../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {api} from 'api'
import {renderFilePicker, renderFieldCheck} from '../../../Utils/renderField/renderField';


const MaterialForm = (props) => {
    const {handleSubmit, 
        crear,
        setMaterial,
        item} = props

    let disabled = false
    const ver =  window.location.href.includes('ver')
    if(ver){
        disabled = true
    }
    return (
        <form name="asignationForm" className="form-validate" onSubmit={handleSubmit}>
            
            <Field name="asignation" component={renderField} type="hidden" className="form-control" disabled={disabled}/>

            <div className="form-group has-feedback">
                <label htmlFor="title">Titulo</label>
                <Field name="title" label="title" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="description">descripcion</label>
                <Field name="description" label="description" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="directory_field">Archivo</label>
                <Field 
                    photo={item ? item.directory_field : null}
                    name="directory_field" 
                    label="directory_field" 
                    component={renderFilePicker} 
                    className="form-control"
                    setFile = {setMaterial}
                />
            </div>
            {item &&
                <a href={item.directory_field} target="_blank">Ver/descargar</a>
            }

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
    form: 'materialForm', // nombre del registro de formulario para todas los materiales
    validate: (data) => {
        return validate(data, {
            title: validators.exists()('Este campo es requerido'),
        });
    },
})(MaterialForm);