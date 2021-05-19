import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Grid from "../../../Utils/Grid";
import {standardActions} from "../../../Utils/Grid/StandardActions";

class HomeworkListStudent extends Component{

    componentWillMount(){
        const {listar, match} = this.props
        const id_asignation = match.params.id_asignation
        listar(id_asignation); 
    }
    render(){
        const {data, loader} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Mis tareas</h1>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <br/>
                            <Grid hover striped data={data} loading={loader}>
                                <TableHeaderColumn
                                    dataField="name"
                                    dataSort
                                >
                                    Profession
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="delivery_date"
                                    dataSort
                                >
                                    Fecha de entrega
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataAlign="center"
                                    dataSort
                                    dataFormat={standardActions({ver: "/homeworkStudent/register" })}
                                >
                                    ver descripcion
                                </TableHeaderColumn>
                            </Grid>
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default HomeworkListStudent;