import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../Utils/Grid";

class EventReadList extends Component{

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
                        <h1 className="text-center text-dark">Eventos</h1>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <Grid hover striped data={data} loading={loader}>
                                <TableHeaderColumn
                                    isKey
                                    dataField="title"
                                    dataSort
                                >
                                    Profession
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="description"
                                    dataSort
                                >
                                    descripcion
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    dataField="date"
                                    dataSort
                                >
                                    Fecha
                                </TableHeaderColumn>
                            </Grid>
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default EventReadList;