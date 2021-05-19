import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoadMask from "../Utils/LoadMask/LoadMask";
import SectionForm from './sectionForm'

class SectionRegister extends Component {

    constructor(props){
        super(props)
        this.state = {
            creacion:true
        }
    }

    componentWillMount(){
        const {match, leer} = this.props
        const id = match.params.id
        if(id){
            leer(id);
            this.setState({
                creacion:false
            })
        }
    }

    actualizar = (data) =>{
        console.log(data)
        const {editar} = this.props;
        const id = data.id
        editar(id, data)
    }

    render() {
        const {crear,loader} = this.props
        const creacion = this.state.creacion
        const fun = creacion == true ? crear : this.actualizar
        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">Registrar seccion</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">NUEVO</h5>
                            <SectionForm onSubmit={fun} loader={loader} crear={creacion}/>  
                    </div>
                </div>
            </div>
        )
        
    }
}

export default SectionRegister;