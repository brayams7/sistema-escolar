import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { setStudentNotAssigned } from '../../../../redux/modules/admin/student/asignationStudent';
import LoadMask from "../../Utils/LoadMask/LoadMask";
import AsignationStudentForm from './asignationForm'
import ListEstudents from './listAsignationStudent'

class RegisterAsignationStudent extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            creacion:true
        }
    }
    
    componentWillMount(){
        const  {match, listarEstudiantesAsignados} = this.props
        const id = match.params.id
        listarEstudiantesAsignados(id);
    }

    listarStudinatesNoAsignados = ()=>{
        const {listStudentNotAssinged, match} = this.props
        const id = match.params.id
        return listStudentNotAssinged(id)
    }

    darDeBaja = (id) =>{
        const {match, darDeBajaEstudiante} = this.props
        const id_asignation = match.params.id
        darDeBajaEstudiante(id_asignation, id);
    }

    render() {
        const {loader, match, data, asignarEstudiante, darDeBajaEstudiante} = this.props
        const creacion = this.state.creacion
        const id = match.params.id
        const fun = creacion == true ? asignarEstudiante : null;
        
        return (
            <React.Fragment>
                <AsignationStudentForm studentNotAssinged={this.listarStudinatesNoAsignados} initialValues={{id_asignation:id}} onSubmit={fun}/>
                <div>
                    <br />
                    <div className="card">
                        <div className="card-header">
                            Listado de estudiantes
                        </div>
                        <div className="card-body">
                            <ListEstudents data={data} loader={loader} darDeBaja={this.darDeBaja}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        ) 
    }
}

export default RegisterAsignationStudent;