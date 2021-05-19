import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../../Utils/Grid";
import {standardActions} from "../../Utils/Grid/StandardActions";

class ProfessionList extends Component{

    componentWillMount(){
        const {listar} = this.props
        listar(); 
    }

    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Listado de de las profesiones</h1>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <Link to="/profession/register" className="btn btn-primary">Nuevo</Link>
                            <br/>
                            <Grid hover striped data={data} loading={loader}>
                                <TableHeaderColumn
                                    dataField="name"
                                    dataSort
                                >
                                    Profession
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="decription"
                                    dataSort
                                >
                                    descripcion
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataAlign="center"
                                    dataSort
                                    dataFormat={standardActions({ editar: "profession", ver: "profession/ver", eliminar: () => {} })}
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
export default ProfessionList;