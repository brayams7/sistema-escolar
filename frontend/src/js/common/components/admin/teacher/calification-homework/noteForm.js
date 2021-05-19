import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators} from 'validate-redux-form';
import { renderField} from '../../../Utils/renderField';
import {renderFilePicker, renderTextArea} from '../../../Utils/renderField/renderField';

const PointsStudentForm = (props) => {
    const {handleSubmit, 
        itemTarea,
        } = props
    
    return (
            <form name="asignationNoteForm" className="form-validate" onSubmit={handleSubmit}>
                
                <div className="form-group has-feedback">
                    <label htmlFor="text">respuesta</label>
                    <Field name="text" label="text" component={renderTextArea} type="text" className="form-control" disabled={true}/>
                </div>
                
                {itemTarea.field != null &&
                    <a href={itemTarea.field} target="_blank">Ver Entrega</a>
                }
                
                <div className="form-group has-feedback">
                    <label htmlFor="note">nota</label>
                    <Field name="note" label="note" component={renderField} type="number" className="form-control"/>
                    <div className="ml-2">/ {itemTarea ? itemTarea.total_nota : null} </div>
                </div>
                
                    <div className="buttons-box">
                        <button type="submit" className="btn btn-primary m-1 align-self-center">
                            agregar nota
                            </button>
                        <input type="reset" className="btn btn-danger m-1 align-self-center"/>
                    </div>
    
            </form>
    );
    
    
};

export default reduxForm({
    form: 'asignationNoteForm', // nombre del registro de formulario para las tareas
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            note: validators.exists()('Este campo es requerido'),
        });
    },
})(PointsStudentForm);