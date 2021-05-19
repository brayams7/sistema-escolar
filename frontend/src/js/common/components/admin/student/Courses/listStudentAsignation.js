import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../../../Utils/Grid";
import {standardActions} from "../../../Utils/Grid/StandardActions";

class CourseList extends Component{

    componentWillMount(){
        const {listCoursesStudent} = this.props
        listCoursesStudent(); 
    }

    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Mis cursos (Estudiante) </h1>
                    </div>
                    <br/>
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <br/>
                            <Grid hover striped data={data} loading={loader}>
                                <TableHeaderColumn
                                    dataField="grade"
                                    dataSort
                                    dataAlign="center"
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
                                                <a href = {`/#/course/detail/${cell}`}><span class="material-icons">list_alt</span></a>
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