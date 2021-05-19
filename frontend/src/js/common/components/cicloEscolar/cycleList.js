import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import CycleForm from './cycleForm'

class CycleList extends Component{

    constructor(props){
        super(props)
        this.state = {
            creacion:true
        }
    }
    
    componentWillMount(){
        const {listar, match, leer} = this.props
        listar();

        const id = match.params.id
        
        if(id){
            leer(id);
            this.setState({
                creacion:false
            })
        }
    }

    componentDidMount(){
        const {listar} = this.props
        listar();
    }

    actualizar = (data) =>{
        console.log(data)
        const {editar} = this.props;
        const id = data.id
        editar(id, data)
    }

    render(){
        
        const {crear,loader, data} = this.props
        const creacion = this.state.creacion
        const fun = creacion == true ? crear : this.actualizar
        console.log('listado',this.props)
        console.log('3')

        return(
            <React.Fragment>
                <div className="py-4">
                    <h2>Ciclo Esolar</h2>
                    <div className="row">
                        <div className="mb-4 col-lg-6">
                            <div className="mb-4 card card-small">
                                <div className="border-bottom card-header"><h6 className="m-0">Estándar</h6></div>
                                <div className="p-0 px-3 pt-3">
                                    <Grid hover data={data} loading={loader}>
                                        <TableHeaderColumn
                                            isKey
                                            dataField="id"
                                            dataSort
                                        >
                                            id
                                        </TableHeaderColumn>
                                        <TableHeaderColumn
                                            dataField="anio"
                                            dataSort
                                        >
                                            Año escolar
                                        </TableHeaderColumn>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 col-lg-6">
                            <div className="mb-4 card card-small">
                                <div className="border-bottom card-header"><h6 className="m-0">Registrar</h6></div>
                                <div className="p-0 px-3 pt-3">
                                    <CycleForm onSubmit={fun} loader={loader} crear={creacion}/>                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default CycleList;