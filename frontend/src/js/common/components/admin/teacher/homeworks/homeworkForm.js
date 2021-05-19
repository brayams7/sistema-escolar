import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField} from '../../../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {api} from 'api'
import {renderFilePicker, renderFieldCheck, renderDatePicker, renderTextArea} from '../../../Utils/renderField/renderField';


const HomeworkForm = (props) => {
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

        <form name="homeworkForm" className="form-validate" onSubmit={handleSubmit}>
            
             <Field name="asignation" component={renderField} type="hidden" className="form-control" disabled={disabled}/>

            <div className="form-group has-feedback">
                <label htmlFor="name">Nombre</label>
                <Field name="name" label="name" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="description">descripcion</label>
                <Field name="description" label="description" component={renderTextArea} type="text" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="delivery_date">Fecha entrega</label>
                <Field name="delivery_date" label="delivery_date" component={renderDatePicker} type="date" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="delivery_time">hora entrega</label>
                <Field name="delivery_time" label="delivery_time" component={renderField} type="time" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="field">Archivo</label>
                <Field 
                    photo={item ? item.directory_field : null}
                    name="field" 
                    label="field" 
                    component={renderFilePicker} 
                    className="form-control"
                    setFile = {setMaterial}
                />
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="note">Nota</label>
                <Field name="note" label="note" component={renderField} type="number" className="form-control" disabled={disabled}/>
            </div>
            
            {item &&
                <a href={item.field} target="_blank">Ver/descargar</a>
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
    form: 'homeworkForm', // nombre del registro de formulario para las tareas
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            note: validators.exists()('Este campo es requerido'),
        });
    },
})(HomeworkForm);