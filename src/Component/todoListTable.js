import React, {Component} from 'react';
import { connect } from 'react-redux'
import {removeTodoList,completeTask, updateListBasedPriority} from '../action/todoListActon'
import 'bootstrap/dist/css/bootstrap.css'


class TodoList extends Component {
    static priorityStoreValue = -1
    constructor() {
        super()
        this.state = {
            priority: '',
            todoList: [],
        }
    }

    
    sortList = (list) => {
       return list.sort((currentItem, nextItem) => currentItem.priority - nextItem.priority);
    }

    formattedName = (status, displayValue) => {
            if (status) {
                return <del>{displayValue}</del>
            }
        return displayValue
    }
    componentDidMount() {
        this.setState({
            todoList: this.sortList(this.props.todoList)
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.todoList !== this.props.todoList) {

            this.setState({
                todoList: this.sortList(this.props.todoList)
            })
        }
    }

    handleClick=(id)=>{
        this.props.dispatch(removeTodoList(id))
    }

    handleChecked=(id)=>{
        this.props.dispatch(completeTask(id))
    }

    handleUpdate = (list) => {
        const {id} = list
        const todoListValue = [...this.state.todoList]
        todoListValue.forEach((item) => {
            if (item.priority === Number(this.state.priority) && item.id !== id) {
                item.priority = this.priorityStoreValue
            }
            if (item.id === id) {
                item.priority = this.state.priority
                item.enableUpdatePrityBtn = false
            }
        })
        this.props.dispatch(updateListBasedPriority(todoListValue))
    }

    handleChangePriority = (e,id) => {
        const newTodoList = [...this.state.todoList]
        newTodoList.forEach((item) => {
        if (item.id === id) {
            if (!item.enableUpdatePrityBtn) {
            this.priorityStoreValue = item.priority}
            item.enableUpdatePrityBtn = true
            item.priority =  e.target.value !== '' ? Number(e.target.value): ''
        }
        })
        this.setState({
            todoList: newTodoList,
            priority: e.target.value !== '' ? Number(e.target.value) : ''
        })
    }
    render() {
        return (
            <div>
            <table className='table table-striped'>
                   <thead>
                       <tr>
                           <th>Status</th>
                           <th>Task name</th>
                           <th>Priority</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           (this.state.todoList || []).map(list=>{
                               return(
                                   <tr key={list.id}>
                                   <td><input type='checkbox' checked={list.completeTask} onChange={()=>{this.handleChecked(list.id)}}/></td>
                                   <td>{this.formattedName(list.completeTask, list.taskName)}</td>
                                   <td><p><input type='number' value={list.priority} onChange={(e)=>{this.handleChangePriority(e,list.id)}}/> {list.enableUpdatePrityBtn && <button className="btn btn-primary" onClick={()=>{this.handleUpdate(list)}}>Update</button>}</p></td>
                                   <td><p><button className="btn btn-danger" onClick={()=>{this.handleClick(list.id)}}>Remove</button>  <button className="btn btn-primary " onClick={()=>{this.props.handleAction('Update', list)}}>Update</button></p></td>
                                   </tr>
                               )
                           })
                       }
                   </tbody>
               </table> 
       </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        todoList: (state.todoList.length && state.todoList) || JSON.parse(localStorage.getItem('todoList')) || []
    }
}

export default connect(mapStateToProps)(TodoList)