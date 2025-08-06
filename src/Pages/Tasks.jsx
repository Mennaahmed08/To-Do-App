import { useEffect, useState } from "react";
import TasksForm from "../Components/TasksForm";
import {tasksApi} from "../services/Tasks";
import useAuth from "../hooks/AuthContext";
import Task from "../Components/Task";

export default function Tasks(){
    const [tasks, setTasks]= useState([]);
    const [editingTask, setEditingTask]= useState(null);
    const [filter, setFilter]= useState("all");
    const [sort, setSort]=useState("dueDate");
    const [currPage, setCurrPage]= useState(1);
    const taskPerPage=3;
    const indexOfLastTask= currPage* taskPerPage;
    const indexOfFirstTask= indexOfLastTask-taskPerPage;
    const currTask= tasks.slice(indexOfFirstTask,indexOfLastTask);
    const {user}= useAuth();
    const fetchTasks= async()=>{
        try {
            const taskData= await tasksApi.fetchTasks(user.id);
            let filterTasks =taskData;
            if(filter !=="all"){
                filterTasks=taskData.filter(task=> task.status==filter)
            }
            if(sort ==="dueDate"){
                filterTasks.sort((a,b)=> new Date(a.dueDate)- new Date(b.dueDate));
            }else if(sort=== "priority"){
                const orderPriority={high:1, medium:2, low:3};
                filterTasks.sort((a,b)=> orderPriority[a.priority] - orderPriority[b.priority]);
            }
            setTasks(filterTasks);
        } catch (error) {
            console.log(error)
        }
    }
    const handelDelete= async(taskId)=>{
        try {
            await tasksApi.deleteTask(taskId);
            fetchTasks();       
        } catch (error) {
            console.log(error);
        }
    }  
    const toggleTask= async(id,currStatus)=>{
        const newStatus= currStatus==="pending"? "completed" :"pending";
        const taskToggle = tasks.find((task)=>
            task.id===id
        )
        if(!taskToggle) return;
        const updatedTask={
            ...taskToggle,status:newStatus,
        }
        console.log({updatedTask})
        try {
            await tasksApi.updateTask(id,updatedTask)
            fetchTasks();
        } catch (error) {
            console.log(error)
        }
    } 


useEffect(() => {
        fetchTasks();
}, [filter,sort]);


return(
    <>
    <div className="max-w-4xl mx-auto p-6">
        <TasksForm
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            fetchTasks={fetchTasks}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
        />
        <h3 className="text-xl font-semibold text-rose-900 mb-3">Your Tasks</h3>
        <div className="space-y-4 flex-1">
            {tasks.length ? currTask.map((task)=>( <Task key={task.id} taskId={task.id} {...task} onEdit={()=> setEditingTask(task)} onDelete={handelDelete} onToggle={()=>toggleTask(task.id,task.status)} /> )):( <p className="p-6 bg-amber-50 rounded-lg text-gray-700">No tasks found</p>)}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
            {Array.from({length: Math.ceil(tasks.length / taskPerPage)}, (_,i)=>(
                <button
                    key={i+1}
                    onClick={()=>  setCurrPage(i+1)}
                    className={`px-3 py-1 rounded-md border ${currPage===i+1 ? "bg-rose-900 text-white": "bg-amber-50 text-rose-900"}`}
                >{i+1}</button>
            ))}
        </div>
        
    </div>
    </>
)
}
