import React from 'react'
import {connect} from 'react-redux'
import {addTodoList, updateTask} from '../action/todoListActon'
import 'bootstrap/dist/css/bootstrap.css'

class UserForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            taskName:this.props.selectedTask.taskName || '',
            errorMsg:'',
            error:false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedTask !== prevProps.selectedTask) {
                this.setState({
                    taskName: this.props.selectedTask.taskName
                })
        }
    }
    
handleChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
   
}

handleSubmit=(e)=>{
    const {taskName}=this.state
    const {mode, selectedTask, list} = this.props
    e.preventDefault()
    if(taskName!==''){

      if (mode === 'Add') {
          const formData={
            id:Number(new Date()),
            taskName,
            completeTask:false,
            priority: list.length + 1
        }
        this.setState({taskName:'',error:false})
        
      
        this.props.dispatch(addTodoList(formData))
    } else {
        const updatedTask={
            id:selectedTask.id,
            taskName,
            completeTask:selectedTask.completeTask
        }
        this.setState({taskName:'',error:false})
        
      
        this.props.dispatch(updateTask(updatedTask))
        this.props.handleAction('Add', {})
    }
    } else{
        this.setState({errorMsg:'invalid input',error:true})
    }
    
}
    render(){
        // const title = this.props.mode === 'Add' ? 'Add'
        return(
            <div className='container'>
                <div className='row'>
                <div className='col-md-4 offset-md-4'>
                <h2 className='display-5 text-center'>{this.props.mode} task</h2>
                <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Task Name</label>
                    <input type='text' className='form-control' id='taskName' name='taskName' value={this.state.taskName} onChange={this.handleChange}/>
                    {!this.state.taskName && this.state.error && <span className='text-danger'>{this.state.errorMsg}</span>}
                </div>
                {/* <div className='form-group'>
                    <label htmlFor='age'>Age</label>
                    <input type='text'className='form-control'  id='age' name='age' value={this.state.age} onChange={this.handleChange}/>
                    {!this.state.age && this.state.error && <span className='text-danger'>{this.state.errorMsg}</span>}
                </div> */}
                    <input type='submit' className="btn btn-primary"/>
                </form>
                </div>
                </div>
            </div>
        )
    }
}


export default connect()(UserForm)