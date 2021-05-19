import React, {Component} from 'react'
import LoadMask from "../../../Utils/LoadMask/LoadMask";
import NoteForm from './noteForm'

class AsignationNoteHomeworkStudent extends Component{
    
    constructor(props){
        super(props)
    }

    componentWillMount(){
        const {match, leerTareaEstudiante} = this.props
        const id_homework_student = match.params.id_homework_student
        leerTareaEstudiante(id_homework_student);
    }

    componentWillUnmount = () => {
        const {clearItem} = this.props;
        clearItem();
    }

    /*create = (data) => {
        const {crear} = this.props
        crear({
            ...data,
            field:null
        },
        [{"file": this.state.field, "name": "field"}]
        )
    }*/

    update = (data) => {
        const { editarNota, match} = this.props;
        editarNota(match.params.id_homework_student, {...data, field: null});
    };

    render(){
        const {loader, item, itemTarea} = this.props
        //const fun = creacion == true ? this.create : this.update
        return(
            <React.Fragment>
                <LoadMask loading={loader} dark blur>
                
                <div className="row">
                    <NoteForm
                        onSubmit={this.update} 
                        loader={loader}
                        itemTarea = {itemTarea}
                    />
                </div>

                </LoadMask>
            </React.Fragment>
        )
    }
}

export default AsignationNoteHomeworkStudent;