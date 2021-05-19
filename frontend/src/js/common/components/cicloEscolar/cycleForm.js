import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'

const CycleForm = (props) => {
    const {handleSubmit, crear} = props
    return (
        <form name="professionForm" className="form-validate" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="anio">Año</label>
                <Field name = "anio" label="anio" component={renderField} type="number" className="form-control"/>
            </div>
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">
                    {crear == true ? 'agregar' :
                            'actualizar'
                    }
                </button>
                <input type="reset" className="btn btn-danger m-1 align-self-center"/>
            </div>
            

        </form>
    );
};

export default reduxForm({
    form: 'cycleSchoolForm', // nombre del registro de formulario para los niveles
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
        });
    },
})(CycleForm);