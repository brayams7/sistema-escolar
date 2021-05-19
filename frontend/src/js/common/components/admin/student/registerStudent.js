import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import TeacherForm from './studentForm';
import LoadMask from "../../Utils/LoadMask/LoadMask";
import StudentForm from './studentForm'
import SetStudentForm from './setStudentForm'
class RegisterStudent extends Component {

    constructor(props){
        super(props)
        this.state = {
            crear:true
        }
    }

    componentWillMount(){
        const {getStudent, match}= this.props
        const id = match.params.id
        if(id){
            this.setState({
                crear:false
            })  
            getStudent(id)
        }
        
}

    render() {
        const {registerStudent,loader, getObject, editStudent,listGrade} = this.props
        const {crear} = this.state

        if (crear){
            return (
                <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">registrar un Estudiante</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">NUEVO</h5>
                            <StudentForm onSubmit={registerStudent} loader={loader} listGrade = {listGrade}/>  
                    </div>
                </div>
            </div>
            )
        }
        else{
            return (
                <div className="bg-light">
                    <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                        <h1 className="text-center text-dark">Estudiante</h1>
                    </div>
                    <br />
                    <div className="login-wrapper">
                        <div className="card card-login col-md-6">
                            <h5 className="text-center pv">NUEVO</h5>
                                
                                <SetStudentForm onSubmit={editStudent} loader={loader} getObject={getObject}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default RegisterStudent;