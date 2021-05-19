import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../../Utils/Grid";
import {standardActions} from "../../Utils/Grid/StandardActions";

class IndexStudent extends Component{

    componentWillMount(){
        const {listCoursesStudent,listarEventos,listarTareas} = this.props
        listCoursesStudent()
        listarEventos()
        listarTareas()
    }

    render(){
        const {data, events, loader} = this.props
        return(
            <React.Fragment>
                <div className="mt-3">
                    ciclo escolar
                </div>
                <div className="row">
                    <div className ="col-md-4 text-center">
                        Total de usuarios
                        <h5 className="text-center">
                            
                        </h5>
                    </div>
                    <div className ="col-md-4 text-center">
                        Total de catedraticos
                        <h5 className="text-center">
                            
                        </h5>
                    </div>
                    <div className ="col-md-4 text-center">
                        Total de estudiantes
                        <h5 className="text-center">
                            
                        </h5>
                    </div>
                </div>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <Grid hover striped data={data} loading={loader}>
                            <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataSort
                                >
                                    id
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    dataField="grade"
                                    dataSort
                                >
                                    Curso
                                </TableHeaderColumn>
                            </Grid>
                            
                        </div>
                    </div>
                    <h5 className="text center mt-3">Actividades del año</h5>
                    <Grid hover striped data={events} loading={loader}>
                            <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataSort
                                >
                                    id
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    dataField="title"
                                    dataSort
                                >
                                    Nombre
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="date"
                                    dataSort
                                >
                                    Fecha
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="hora"
                                    dataSort
                                >
                                    Horario
                                </TableHeaderColumn>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}
export default IndexStudent;