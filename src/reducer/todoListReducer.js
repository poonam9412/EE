const initialState=[]

const updatenSesson = (sessonValue) => {
    localStorage.setItem('todoList', JSON.stringify(sessonValue))
}

const todoListReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'TODOLIST_ADD':{
            updatenSesson([...state,action.payload])
            return [...state,action.payload]
        }

        case 'TODOLIST_REMOVE':{
            const newState =  state.filter(todoList=> todoList.id!==action.payload)
            updatenSesson(newState)
            return newState
        }

        case 'COMPLETE_TASK':{
            const newState = state.map(todoList=>{
                if(todoList.id===action.payload){
                    return {...todoList,completeTask:!todoList.completeTask}
                }else{
                    return{...todoList}
                }
            })
            updatenSesson(newState)

            return newState
        }

        case 'UPDATE_TASK' : {
            const newState = state.map(todoList=>{
                if(todoList.id===action.payload.id){
                    return {...todoList,taskName:action.payload.taskName}
                } else{
                    return{...todoList}
                }
            })
            updatenSesson(newState)

            return newState
        }

        case 'UPDATE_TODO_LIST': {
            const newState = [].concat(action.payload)
            updatenSesson(newState)
            return newState
        }
        
        default:{
            if (JSON.parse(localStorage.getItem('todoList'))) {
                return JSON.parse(localStorage.getItem('todoList'))
            }
            return [...state]
        }
    }
}

export default todoListReducer