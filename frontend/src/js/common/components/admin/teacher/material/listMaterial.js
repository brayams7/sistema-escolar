import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Material from './material'
class MaterialList extends Component{

    componentWillMount(){
        const {match, listar} = this.props
        const id_asignation = match.params.id
        listar(id_asignation); 
    }
    render(){
        const {data, loader, match, rol} = this.props
        const id_asignation = match.params.id

        return(
            <React.Fragment>
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Materiales</h1>
                    </div>
                    <br/>
                    <div className="login-wrapper">
                        <div className="card card-login col-md-12">
                            <br/>
                            {data.count != 0 ?
                                <Material data={data} loader={loader} id_asignation = {id_asignation} rol={rol}/>
                            : <h1 className="text-muted text-center">
                                <a href={`/#/material/register/${id_asignation}`}>Agrega + material</a>
                                </h1>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default MaterialList;