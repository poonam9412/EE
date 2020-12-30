import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddTakView from './addTask'
import TodoListView from './todoListTable'



class TodoList extends Component {
    state = {
        mode: 'Add',
        selectedTask: {}
    }

    handleAction = (mode, selectedTask) => {
        this.setState({
            mode,
            selectedTask
        })
    }
    render () {
    return(
        <div className='container'>
            <h2 className='display-5 text-center'>TODO List- {this.props.todoList.length}</h2>
           {this.props.todoList.length > 0 && <TodoListView handleAction={this.handleAction} />}
            <br/>
            <AddTakView mode={this.state.mode} handleAction={this.handleAction} selectedTask={this.state.selectedTask} list={this.props.todoList} />
            
        </div>
    )}
}

const mapStateToProps=(state)=>{
    return{
        todoList: (state.todoList.length && state.todoList) || JSON.parse(localStorage.getItem('todoList')) || []
    }
}
export default connect(mapStateToProps)(TodoList)