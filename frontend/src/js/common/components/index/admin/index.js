import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../../Utils/Grid";
import {standardActions} from "../../Utils/Grid/StandardActions";

class IndexAdmin extends Component{

    componentWillMount(){
        const {listarNiveles, totalUsuarios, totalCatedraticos, totalEstudiantes, totalGrados, totalSecciones,leerCicloEscolar} = this.props
        listarNiveles();
        totalUsuarios(); 
        totalCatedraticos();
        totalEstudiantes();
        leerCicloEscolar()
        totalGrados();
        totalSecciones()
    }

    render(){
        const {levels, loader, users, teachers, students, anio, grades, sections} = this.props
        return(
            <React.Fragment>
                <div className="mt-3">
                    ciclo escolar {anio.anio}
                </div>
                <div className="row">
                    <div className ="col-md-4 text-center">
                        Total de usuarios
                        <h5 className="text-center">
                            {users.total_users}
                        </h5>
                    </div>
                    <div className ="col-md-4 text-center">
                        Total de catedraticos
                        <h5 className="text-center">
                            {teachers.total_teachers}
                        </h5>
                    </div>
                    <div className ="col-md-4 text-center">
                        Total de estudiantes
                        <h5 className="text-center">
                            {students.total_students}
                        </h5>
                    </div>
                </div>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <Grid hover striped data={levels} loading={loader}>
                            <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataSort
                                >
                                    id
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    dataField="name"
                                    dataSort
                                >
                                    Nivel
                                </TableHeaderColumn>
                            </Grid>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className ="col-md-6 text-center">
                            Total de grados
                            <h5 className="text-center">
                                {grades.total_grade}
                            </h5>
                        </div>
                        <div className ="col-md-6 text-center">
                            Total de secciones
                            <h5 className="text-center">
                                {sections.total_section}
                            </h5>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default IndexAdmin;