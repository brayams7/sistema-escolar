import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../Utils/Grid";
import {Link, Redirect} from 'react-router-dom';

import {standardActions} from "../../Utils/Grid/StandardActions";

class ListTeacher extends Component{
    componentWillMount = ()=>{
        const {listTeacher} = this.props
        listTeacher();
        
        //onPageChange={onPageChange} onSortChange={onSortChange} 
    }
    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Listado de catedraticos</h1>
                    </div>
                    <Link to="/teacher/register" className="btn btn-primary">Nuevo</Link>
                    
                    <br />

                    <div className="login-wrapper">
                        <div className="card card-login col-md-10">
                        <Grid hover striped data={data} loading={loader}>
                            <TableHeaderColumn
                                isKey
                                dataField="id"
                                dataSort
                            >
                                ID
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="profile"
                                dataSort
                            >
                                Perfil
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="profession"
                                dataSort
                            >
                                Profesion
                            </TableHeaderColumn>
                                
                            <TableHeaderColumn
                                dataField="email"
                                dataSort
                            >
                                Correo
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="es_titular"
                                dataSort
                            >
                                es titilar
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({ editar: "teacher", ver: "teacher/ver", eliminar: () => {} })}
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