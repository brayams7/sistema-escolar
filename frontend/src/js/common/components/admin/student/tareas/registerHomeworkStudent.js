import React, {Component} from 'react'
import LoadMask from "../../../Utils/LoadMask/LoadMask";
import AddHomeworkStudent from './addHomeworkStudent'

class HomeworkStudent extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            creacion:true,
            field:null
        }
    }

    componentWillMount(){
        const {match, leer, leerItemTarea} = this.props
        const id_homework = match.params.id_homework
        leer(id_homework);
        leerItemTarea(id_homework);
        const editar =  window.location.href.includes('edit')
        if(editar){
            this.setState({
                creacion : false
            })
        }
    }

    componentWillUnmount = () => {
        const {clearItem} = this.props;
        clearItem();
    }

    setMaterial = (field)=>{
        this.setState({ field: field})
    }
    
    create = (data) => {
        const {crear} = this.props
        crear({
            ...data,
            field:null
        },
        [{"file": this.state.field, "name": "field"}]
        )
    }

    update = (data) => {
        const { editar } = this.props;
        editar(data.homework, {...data, field: null}, [{"file": this.state.field, "name": "field"}]);
    };

    render(){
        const {loader, item, match, itemTarea} = this.props
        const creacion = this.state.creacion
        const id_homework = match.params.id_homework 
        const fun = creacion == true ? this.create : this.update
        
        return(
            <React.Fragment>
                <LoadMask loading={loader} dark blur>
                {item &&
                    <div  className="row">
                            <div className="row d-flex justify-content-end">
                                <div className="col-md-8 text-center">
                                    <h4 className="text-muted">{item.name}</h4>
                                </div>
                                <div className="col-md-4 d-flex justify-content-end">
                                    <h5 className="text-muted">Nota {item.note}</h5>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <p className="fs-5">{item.description}</p>
                            </div>
                        
                            <a href={item ? item.field : null} target="_blank">Ver/descargar</a>  
                    </div>
                }
                <hr className="text-muted"/>
                <div className="row">
                    <AddHomeworkStudent
                        onSubmit={fun} 
                        loader={loader} 
                        crear={creacion} 
                        setMaterial = {this.setMaterial}
                        initialValues={{'homework':id_homework}}
                        itemTarea = {itemTarea}
                    />
                </div>

                </LoadMask>
            </React.Fragment>
        )
    }
}

export default HomeworkStudent;