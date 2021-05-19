import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../Utils/Grid";
import {standardActions} from "../../Utils/Grid/StandardActions";

class ListAsignations extends Component{

    render(){
        const {data, loader, darDeBaja} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                        <Grid hover striped data={data} loading={loader}>
                            <TableHeaderColumn
                                
                                dataField="id_student"
                                dataSort
                            >
                                id
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="student"
                                dataSort
                            >
                                Estudiante
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
                                    isKey
                                    dataField="id_student"
                                    dataAlign="center"
                                    dataSort
                                    dataFormat={standardActions({ eliminar: darDeBaja })}
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
export default ListAsignations;