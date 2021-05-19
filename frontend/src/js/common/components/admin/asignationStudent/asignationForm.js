import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField} from '../../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {api} from 'api'
import {renderFilePicker, renderFieldCheck, AsyncSelectField, SelectField} from '../../Utils/renderField/renderField';

const AsignationStudentForm = (props) => {
    const {handleSubmit, studentNotAssinged} = props
    return (
        <React.Fragment>
            <form name="asignationStudentForm" className="form-validate navbar navbar-light bg-light" onSubmit={handleSubmit}>
                <div className="container-fluid">
                    <a className="navbar-brand">Estudiantes sin asignar</a>
                    <div className="row">
                        <Field 
                            name = "id_asignation"
                            component={renderField} 
                            type="hidden" 
                            className="form-control" 
                        />
                        <div className="form-group pe-3">
                            <Field
                                    name="student"
                                    component={AsyncSelectField}
                                    className="form-control"
                                    loadOptions={studentNotAssinged}
                                    type="text"
                            />
                        </div>
                        <button className="btn btn-outline-success" type="submit">agregar</button>
                    </div>
                </div>  
            </form>
        </React.Fragment>
    );
};

export default reduxForm({
    form: 'asignationStudentForm', // nombre del registro de formulario para todas las asignaciones
    validate: (data) => {
        return validate(data, {
            student: validators.exists()('Este campo es requerido'),
        });
    },
})(AsignationStudentForm);