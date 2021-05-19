import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import TeacherForm from './TeacherForm';
import SetTeacherForm from './setTeacherForm'
import LoadMask from "../../Utils/LoadMask/LoadMask";

class RegisterTeacher extends Component {

    constructor(props){
        super(props)
        this.state = {
            crear:true
        }
    }

    componentWillMount(){
        const {getTeacher, match}= this.props
        const id = match.params.id
        if(id){
            this.setState({
                crear:false
            })  
            getTeacher(id)
        }
        
    }
    render() {
        const {registerTeacher,loader, getObject, editTeacher} = this.props
        console.log(this.props)
        const {crear} = this.state
        
        if (crear){
            return (
                <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">registrar un catedrático</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">NUEVO</h5>
                            <TeacherForm onSubmit={registerTeacher} loader={loader}/>  
                    </div>
                </div>
            </div>
            )
        }
        else{
            return (
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Catedrático</h1>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-6">
                            <h5 className="text-center pv">NUEVO</h5>
                                
                                <SetTeacherForm onSubmit={editTeacher} loader={loader} getObject={getObject}/>
                        </div>
                    </div>
                </div>
            );
        }

        
    }
}

export default RegisterTeacher;