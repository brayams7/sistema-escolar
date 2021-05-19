import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListAsignation extends Component{
    componentWillMount = ()=>{
        const {list} = this.props
        list();
        
        //onPageChange={onPageChange} onSortChange={onSortChange} 
    }
    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Listado de catedraticos con asignacion</h1>
                    </div>
                    <Link to="/asignation/register" className="btn btn-primary">Nuevo</Link>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-10">
                        <Grid hover striped data={data} loading={loader}>
                            <TableHeaderColumn
                                
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
                                isKey
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({ editar: "", ver: "/asignation/ver", eliminar: () => {} })}
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
export default ListAsignation;