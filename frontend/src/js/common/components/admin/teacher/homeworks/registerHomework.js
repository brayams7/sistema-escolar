import { relativeTimeThreshold } from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoadMask from "../../../Utils/LoadMask/LoadMask";
import HomeworkForm from './homeworkForm'

class RegisterHomework extends Component {

    constructor(props){
        super(props)
        this.state = {
            creacion:true,
            field:null
        }
    }
    componentWillMount(){
        const {match, leer} = this.props
        const id_homework = match.params.id_homework
        const id_asignation = match.params.id_asignation
        console.log('asignation', id_asignation)
        console.log('material', id_homework)
        
        if(id_homework){
            leer(id_asignation, id_homework);
            this.setState({
                creacion : false
            })
        }
    }

    componentWillUnmount = () => {
        const {clearItem} = this.props;
        clearItem();
    }

    setMaterial = (field)=>{
        this.setState({ field: field})
    }
     
    create = (data) => {
        const {crear} = this.props
        crear({
            ...data,
            field:null
        },
        [{"file": this.state.field, "name": "field"}]
        )
    }

    update = (data) => {
        const { editar } = this.props;
        console.log(data.id, data.asignation)
        editar(data.id, {...data, field: null}, [{"file": this.state.field, "name": "field"}]);
    };    

    render() {
        const {loader, item, match} = this.props
        const creacion = this.state.creacion
        const id_asignation = match.params.id 
        const fun = creacion == true ? this.create : this.update

        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">Trabajo</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">NUEVO</h5>
                            <HomeworkForm 
                                onSubmit={fun} 
                                loader={loader} 
                                crear={creacion} 
                                setMaterial = {this.setMaterial}
                                item = {item}
                                initialValues={{'asignation':id_asignation}}
                            />  
                    </div>
                </div>
            </div>
        )
        
    }
}

export default RegisterHomework;