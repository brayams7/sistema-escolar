import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Homework from './homework'

class HomeworkList extends Component{

    componentWillMount(){
        const {match, listar} = this.props
        const id_asignation = match.params.id
        listar(id_asignation); 
    }
    render(){
        const {data, loader, match} = this.props
        const id_asignation = match.params.id

        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Trabajos</h1>
                    </div>
                    <br/>
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <br/>
                            {data.count != 0 ?
                                <Homework data={data} loader={loader} id_asignation = {id_asignation}/>
                            : <h1 className="text-muted text-center">
                                <a href={`/#/homework/register/${id_asignation}`}>Agrega + tarea</a>
                                </h1>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default HomeworkList;