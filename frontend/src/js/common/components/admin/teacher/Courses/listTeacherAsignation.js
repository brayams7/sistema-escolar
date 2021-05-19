import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../../../Utils/Grid";
import {standardActions} from "../../../Utils/Grid/StandardActions";

class CourseList extends Component{

    componentWillMount(){
        const {listAsignationTeacher} = this.props
        listAsignationTeacher(); 
    }

    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Mis cursos</h1>
                    </div>
                    <br/>
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <br/>
                            <Grid hover striped data={data} loading={loader}>
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
                                    seccion
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    dataField="grade"
                                    dataSort
                                >
                                    grade
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataAlign="center"
                                    dataSort
                                    dataFormat = {(cell)=>{
                                        return(
                                            <React.Fragment>
                                                <div className="d-inline-block item-icon-wrapper">
                                                    <a href = {`/#/asignarEstudiante/${cell}`}><i className="material-icons">add link</i></a>
                                                </div>
                                                
                                                <a href = {`/#/material/${cell}`} ><span class="material-icons">chrome_reader_mode</span></a>
                                            
                                                <a href = {`/#/homework/${cell}`}><span class="material-icons">receipt_long</span>
</a>
                                            </React.Fragment>
                                            ) 
                                    }}
    
                                    //dataFormat={standardActions({ asignarStudent:"/asignarEstudiante"})}
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
export default CourseList;