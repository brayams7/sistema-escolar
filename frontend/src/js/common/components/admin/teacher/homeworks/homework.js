import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import LoadMask from "../../../Utils/LoadMask/LoadMask";


class Homework extends Component{

    render(){
        const {data, loader, id_asignation} = this.props
        return(
            <React.Fragment>
                <LoadMask loading={loader} dark blur>
                {data.results.map(tarea =>{
                    return(
                        <div key={tarea.id}>
                            <div  className="row">
                                <div className="row d-flex justify-content-end">
                                    <div className="col-md-8 text-center">
                                        <h4 className="text-muted">{tarea.name}</h4>
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-end">
                                        <h5 className="text-muted mr-2">{tarea.delivery_date}</h5>
                                        <h5 className="text-muted">{tarea.delivery_time}</h5>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <p className="fs-5">{tarea.description}</p>
                                </div>

                                <div className="col-md-12">
                                    <p className="fs-5">{tarea.note}</p>
                                </div>
                                {
                                    tarea.field != null &&
                                    <React.Fragment>
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <a href={tarea.field} target="_blank" className="btn btn-success"> descargar </a>
                                        </div>
                                    </React.Fragment>
                                } 
                                <div className="col-md-12 d-flex justify-content-end mt-2">
                                    <a href={`/#/homework/edit/${id_asignation}/${tarea.id}`} className="btn btn-primary"> modificar </a>
                                </div>
                                <div className="col-md-12 d-flex justify-content-end mt-2">
                                    <a href={`/#/listHomework/calification/${tarea.id}`} className="btn btn-success"> ver entregados </a>
                                </div>
                                
                            </div>
                            <hr className="text-muted"/>
                        </div>
                    
                    )
                })}
                </LoadMask>
            </React.Fragment>
        )
    }
}

export default Homework;