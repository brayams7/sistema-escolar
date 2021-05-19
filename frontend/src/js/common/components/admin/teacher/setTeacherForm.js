import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {api} from 'api' 
import {
    SelectField,
    AsyncSelectField,
}  from "Utils/renderField/renderField";
import { element } from 'prop-types';

class SetTeacherForm extends Component {

    render() {

        const {handleSubmit, getObject} = this.props
        const editar = window.location.href.includes('editar')
        let disabled = false

        if(editar === false){
            disabled = true
        }

        /*const getProfession = () => {
            let profession = []
            const {getObject} = this.props
            try{
                profession = getObject.profession.map((element) => ({
                    value: element.id,
                    label: element.name,
                }));
            }catch(error){
                console.log(error)
                return profession
            }
            return profession
        };*/

        const listProfessions = (search) => {
            let professions = [];
            return api.get("/profession", { search })
                .then((response) => {
                    professions = response.results.map((element) => ({
                        value: element.id,
                        label: element.name,
                    }));
                    console.log("profesiones",professions)
                    return professions;
                })
                .catch((err) => {
                    return professions;
                });
        };
        return (
            <form name="teacher" className="form-validate" onSubmit={handleSubmit}>
                <div className="form-group has-feedback">
                    <label htmlFor="first_name">Nombre</label>
                    <Field name = "first_name" label="first_name" component={renderField} type="text" className="form-control" disabled={disabled}/>
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="last_name">Apellido</label>
                    <Field name="last_name" label="Apellido" component={renderField} type="text" className="form-control" disabled={disabled}/>
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="email">Email</label>
                    <Field name="email" label="email" component={renderField} type="email" className="form-control" disabled={disabled}/>
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="address">Direccion</label>
                    <Field name="address" label="address" component={renderField} type="text" className="form-control" disabled={disabled}/>
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="phone">Telefono</label>
                    <Field name="phone" label="phone" component={renderField} type="text" className="form-control" disabled={disabled}/>
                </div>
                 
                <div className="form-group has-feedback">
                    <Field
                        name="profession"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={listProfessions}
                        type="text"
                    />
                </div>
                { disabled == false &&
                <div className="buttons-box">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar Catedrático</button>
                </div>
                }
            </form>
        );
    }
}


export default reduxForm({
    form: 'setTeacherForm', // nombre del actualizado de formulario para catedráticos
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            email: validators.exists()('Este campo es requerido'),
            address: validators.exists()('Este campo es requerido'),
            phone: validators.exists()('Este campo es requerido')
        });
    },
})(SetTeacherForm);