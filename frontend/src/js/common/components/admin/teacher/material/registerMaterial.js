import { relativeTimeThreshold } from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoadMask from "../../../Utils/LoadMask/LoadMask";
import MaterialForm from './materialForm'

class RegisterMaterial extends Component {

    constructor(props){
        super(props)
        this.state = {
            creacion:true,
            directory_field:null
        }
    }
    componentWillMount(){
        const {match, leer} = this.props
        const id_material = match.params.id_material
        const id_asignation = match.params.id_asignation
        console.log('asignation', id_asignation)
        console.log('material', id_material)
        if(id_material){
            leer(id_asignation, id_material);
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
        this.setState({ directory_field: field})
    }
     
    create = (data) => {
        const {crear} = this.props
        crear({
            ...data,
            directory_field:null
        },
        [{"file": this.state.directory_field, "name": "directory_field"}]
        )
    }

    update = (data) => {
        const { editar } = this.props;
        console.log(data.id, data.asignation)
        editar(data.id, {...data, directory_field: null}, [{"file": this.state.directory_field, "name": "directory_field"}]);
    };    

    render() {
        const {loader, item, match} = this.props
        const creacion = this.state.creacion
        const id_asignation = match.params.id 
        const fun = creacion == true ? this.create : this.update
        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">material</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">NUEVO</h5>
                            <MaterialForm 
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

export default RegisterMaterial;