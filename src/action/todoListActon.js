export const addTodoList=(todoList)=>{
    return{
        type:'TODOLIST_ADD',
        payload:todoList
    }
}

export const removeTodoList=(id)=>{
    return{
        type:'TODOLIST_REMOVE',
        payload:id
    }
}

export const completeTask=(id)=>{
  return{
        type:'COMPLETE_TASK',
        payload:id
    }
}

export const updateTask=(payload)=>{
    return{
          type:'UPDATE_TASK',
          payload
      }
  }

export const updateListBasedPriority=(payload)=>{
    return{
            type:'UPDATE_TODO_LIST',
            payload
        }
}