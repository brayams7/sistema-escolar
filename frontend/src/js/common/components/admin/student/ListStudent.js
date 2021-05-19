import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../Utils/Grid";
import {Link, Redirect} from 'react-router-dom';

import {standardActions} from "../../Utils/Grid/StandardActions";

class ListTeacher extends Component{
    componentWillMount = ()=>{
        const {listStudent} = this.props
        listStudent();
        //onPageChange={onPageChange} onSortChange={onSortChange} 
    }
    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Listado de studiantes</h1>
                    </div>
                    <Link to="/student/register" className="btn btn-primary">Nuevo</Link>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                        <Grid hover striped data={data} loading={loader}>
                            <TableHeaderColumn
                                dataField="profile"
                                dataSort
                            >
                                Perfil
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="carne"
                                dataSort
                            >
                                carnet
                            </TableHeaderColumn>
                                
                            <TableHeaderColumn
                                dataField="email"
                                dataSort
                            >
                                Correo
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="grade"
                                dataSort
                            >
                                Grado
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                isKey
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({ editar: "student", ver: "student/ver", eliminar: () => {} })}
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
export default ListTeacher;