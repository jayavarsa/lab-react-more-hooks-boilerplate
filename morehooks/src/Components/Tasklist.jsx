import {useEffect, useReducer, useRef} from 'react';


const taskReducer = (state,action) =>{
    switch(action.type){
        case "ADD_TASK":
            return [...state, {id:Date.now(), text:action.payload,hidden:false}]
        case "TOGGLE_TASK":
            return state.map((task)=>(task.id === action.payload ? {...task,hidden: !task.hidden}:task))
        default:
            return state;
    }
}
const Tasklist = () =>{

    const[tasks, dispatch]= useReducer(taskReducer,[])

    const inputRef = useRef()

    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[tasks]);

    const handleAddTask = (text) => dispatch({type:'ADD_TASK',payload:text});

    const handleToggleTask = (id)=>{
        dispatch({type:'TOGGLE_TASK',payload:id});
    }

    const handleBackToTop = () =>{
        
        if(inputRef.current){
            inputRef.current.focus()
        }
    }
    return(
        <>
        <div className='container'>
            <h2>Task List</h2>
            <div>
               <input type='text' placeholder='Enter Task' ref={inputRef}
               onKeyDown={(e)=>e.key === "Enter" &&(handleAddTask(e.target.value),(e.target.value==''))}
               />
            </div>
            <ul>
                {tasks.map((task)=>(
                    <li key={task.id}>
                        <span style={{
                            textDecoration:task.hidden ? 'line-through':'none'}}>
                            {task.hidden? 'task is hidden':task.text}
                        </span>
                        <button type='button' onClick={()=> handleToggleTask(task.id)}>
                            Toggle
                        </button>
                    </li>
                ))}
            </ul>
            <button className='back-to-top-button'
               onClick={handleBackToTop}>
                Get back Writing
               </button>
        </div>

        </>
    );
}
export default Tasklist