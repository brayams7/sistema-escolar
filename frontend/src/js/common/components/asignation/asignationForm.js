import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField} from '../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {api} from 'api'
import {renderFilePicker, renderFieldCheck, AsyncSelectField} from '../Utils/renderField/renderField';


const AsignationForm = (props) => {
    const {handleSubmit, 
        crear,
        listAnio,
        listGrade, 
        listSection,
        listTeacher,
        listCourse,
        setPortada,
        item} = props

    let disabled = false
    const ver =  window.location.href.includes('ver')
    if(ver){
        disabled = true
    }
    return (
        <form name="asignationForm" className="form-validate" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                    <Field
                        name="schoolCycle"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listAnio}
                        type="text"
                        disabled = {disabled}
                    />
                
            </div>
            
            <div className="form-group has-feedback">
                    <Field
                        name="grade"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listGrade}
                        type="text"
                        disabled = {disabled}
                    /> 
            </div>

            <div className="form-group has-feedback">
                    <Field
                        name="section"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listSection}
                        type="text"
                        disabled = {disabled}
                    />
            </div>

            <div className="form-group has-feedback">
                    <Field
                        name="course"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listCourse}
                        type="text"
                        disabled = {disabled}
                    />
            </div>

            <div className="form-group has-feedback">
                    <Field
                        name="teacher"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listTeacher}
                        type="text"
                        disabled = {disabled}
                    />
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="description">descripcion</label>
                <Field name="description" label="description" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="avatar">Imagen</label>
                <Field 
                    photo={item ? item.avatar : null}
                    name="avatar" 
                    label="avatar" 
                    component={renderFilePicker} 
                    className="form-control"
                    setFile = {setPortada}
                />
            </div>
            {item &&
                <a href={item.avatar} target="_blank">Ver/descargar</a>

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
    form: 'asignationForm', // nombre del registro de formulario para todas las asignaciones
    validate: (data) => {
        return validate(data, {
            teacher: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
        });
    },
})(AsignationForm);