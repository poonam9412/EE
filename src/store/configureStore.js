import {combineReducers,createStore} from 'redux'
import TodoListReducer from '../reducer/todoListReducer'

const configureStore=()=> {
    const store=createStore(combineReducers({
        todoList:TodoListReducer,
    }))

    return store
}

export default configureStore