import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListTeacherAsignation extends Component{
    componentWillMount = ()=>{
        const {listTeacherAsignations, match} = this.props
        const id = match.params.id
        listTeacherAsignations(id);
        
        //onPageChange={onPageChange} onSortChange={onSortChange} 
    }
    render(){
        const {dataAsignationTeacher, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">teacher detail</h1>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-10">
                        <Grid hover striped data={dataAsignationTeacher} loading={loader}>
                            <TableHeaderColumn
                                dataField="teacher"
                                dataSort
                            >
                                Catedrático
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="grade"
                                dataSort
                            >
                                Grado
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="section"
                                dataSort
                            >
                                Seccion
                            </TableHeaderColumn>
                                
                            <TableHeaderColumn
                                dataField="course"
                                dataSort
                            >
                                Correo
                            </TableHeaderColumn>
    
                            <TableHeaderColumn
                                isKey
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({ editar: "/asignation", ver: "/asignation/ver", eliminar: () => {} })}
                            >
                                Acciones
                            </TableHeaderColumn>
                        </Grid>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ListTeacherAsignation;