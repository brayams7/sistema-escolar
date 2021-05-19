import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import {Link, Redirect} from 'react-router-dom';
import LoadMask from "../../../Utils/LoadMask/LoadMask";


class Material extends Component{

    render(){
        const {data, loader, id_asignation, rol} = this.props
        return(
            <React.Fragment>
                <LoadMask loading={loader} dark blur>
                {data.results.map(material =>{
                    return(
                        <div key={material.id}>
                            <div  className="row">
                                <div className="col-md-12 text-center">
                                    <h4 className="text-muted">{material.title}</h4>

                                </div>
                                <div className="col-md-12">
                                    <p className="fs-5">{material.description}</p>
                                </div>
                                
                                <div className="col-md-12 d-flex justify-content-end">
                                    <a href={material.directory_field} target="_blank" className="btn btn-success"> descargar </a>
                                </div>
                                { rol == 2 &&
                                    <div className="col-md-12 d-flex justify-content-end mt-2">
                                        <a href={`/#/material/edit/${id_asignation}/${material.id}`} className="btn btn-primary"> modificar </a>
                                    </div>
                                }
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

export default Material;