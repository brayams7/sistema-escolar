import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators} from 'validate-redux-form';
import { renderField} from '../../../Utils/renderField';
import {renderFilePicker, renderTextArea} from '../../../Utils/renderField/renderField';

const HomeworkStudentForm = (props) => {
    const {handleSubmit, 
        crear,
        setMaterial,
        itemTarea,
        } = props

    let disabled = false
    
    if(crear == false){
        disabled = true
    }
    return (
            <form name="homeworkStudentForm" className="form-validate" onSubmit={handleSubmit}>
                
                 <Field name="homework" component={renderField} type="hidden" className="form-control" disabled={disabled}/>
    
                 <Field name="id" component={renderField} type="hidden" className="form-control" disabled={disabled}/>
                
                <div className="form-group has-feedback">
                    <label htmlFor="text">comentario o respuesta</label>
                    <Field name="text" label="text" component={renderTextArea} type="text" className="form-control" disabled={disabled} value={itemTarea.text ? itemTarea.text : null}/>
                </div>
    
                <div className="form-group has-feedback">
                    <label htmlFor="field">Archivo</label>
                    <Field
                        photo={itemTarea ? itemTarea.field : null}
                        name="field" 
                        label="field" 
                        component={renderFilePicker} 
                        className="form-control"
                        setFile = {setMaterial}
                    />
                </div>
                {itemTarea.field != null &&
                    <a href={itemTarea.field} target="_blank">Ver Entrega</a>
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
    form: 'homeworkStudentForm', // nombre del registro de formulario para las tareas
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            note: validators.exists()('Este campo es requerido'),
        });
    },
})(HomeworkStudentForm);