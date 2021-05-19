import React, {Component} from 'react'
import PropTypes from 'prop-types';

class DetailCourse extends Component{

    componentWillMount(){
        const {match, leer} = this.props
        const id_asignation_student = match.params.id_asignation_student
        leer(id_asignation_student);
    }
    
    render(){
        const {item, loader, match} = this.props
        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Detalle del curso</h1>
                    </div>
                    <br/>
                    {
                        item &&
                    
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <br/>
                            <div >
                                <div  className="row">
                                    <div className="col-md-12 text-center">
                                        <h4 className="text-muted">{item.course != null && item.course}</h4>
                                    </div>
                                    <div className="col-md-12">
                                        <p className="fs-5">{item.grade != null && item.grade}</p>
                                    </div>
                                    {item.avatar != null && 
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <h4 className="text-muted">
                                                {item.avatar}
                                            </h4>
                                        </div>
                                        
                                    }
                                    <div className="col-md-12">
                                        <p className="fs-5">Nombre del catedrático, {item.teacher != null && item.teacher}</p>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-end mt-2">
                                        <a href={`/#/material/${item.id_asignation}`} className="btn btn-primary"> Materiales </a>
                                        <a href={`/#/homeworkStudent/${item.id_asignation}`} className="btn btn-primary"> Tareas </a>
                                    </div>
                                    <hr className="text-muted"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}
export default DetailCourse;