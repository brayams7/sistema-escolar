import { relativeTimeThreshold } from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { crear, listCourse } from '../../../redux/modules/Asignacion/asignacion';
import LoadMask from "../Utils/LoadMask/LoadMask";
import AsignationForm from './asignationForm'

class RegisterAsignation extends Component {

    constructor(props){
        super(props)
        this.state = {
            creacion:true,
            avatar:null
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

    componentWillUnmount = () => {
        const {clearItem} = this.props;
        clearItem();
    }

    setPortada = (img)=>{
        this.setState({ avatar: img})
    }
     
    create = (data) => {
        const {crear} = this.props
        crear({
            ...data,
            avatar:null
        },
        [{"file": this.state.avatar, "name": "avatar"}]
        )
    }
    update = (data) => {
        const { editar } = this.props;
        editar(data.id, {...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);
    };    

    actualizar = (data) =>{
        const {editar} = this.props;
        const id = data.id
        editar(id, data)
    }

    render() {
        const {loader, listAnio, listGrade, listSection, listTeacher, listCourse, item} = this.props
        const creacion = this.state.creacion

        const fun = creacion == true ? this.create : this.update
        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">Asignacion</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">NUEVO</h5>
                            <AsignationForm 
                                onSubmit={fun} 
                                loader={loader} 
                                crear={creacion} 
                                listAnio={listAnio}
                                listGrade={listGrade}
                                listSection={listSection}
                                listTeacher={listTeacher}
                                listCourse={listCourse}
                                setPortada = {this.setPortada}
                                item = {item}
                            />  
                    </div>
                </div>
            </div>
        )
        
    }
}

export default RegisterAsignation;