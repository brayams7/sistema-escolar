import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../../Utils/Grid";

class IndexTeacher extends Component{

    componentWillMount(){
        const {listCoursesTeacher,listarEventos,totalTareasPorCalificar,
            totalTareasPorCurso} = this.props
        listCoursesTeacher()
        listarEventos()
        totalTareasPorCurso()
        totalTareasPorCalificar()
    }

    render(){
        const {data, events, loader, tareasPorCurso, totalTareas} = this.props
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
                                    Grado
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="course"
                                    dataSort
                                >
                                    Curso
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="section"
                                    dataSort
                                >
                                    Seccion
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
                    
                    <h5 className="text center mt-3">Total de tareas</h5>
                    <p>{totalTareas}</p>
                    <h5 className="text center mt-3">Tareas pendientes de calificar por curso</h5>
                    <Grid hover striped data={tareasPorCurso} loading={loader}>
                            <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataSort
                                >
                                    id
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    dataField="course"
                                    dataSort
                                >
                                    Curso
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="pendientes_calificar"
                                    dataSort
                                >
                                    Pendientes por calificar
                                </TableHeaderColumn>
                                
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}
export default IndexTeacher;