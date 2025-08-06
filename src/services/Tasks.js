import axios from "axios"

export const tasksApi={
    createTask: async(taskName, description,priority,dueDate,status,userId) => {
        const createTask= await axios.post("http://localhost:3000/tasks",{taskName,description,priority,dueDate,status,userId})
        return createTask;
    },
    fetchTasks: async(userId)=>{ 
        const {data}= await axios.get(`http://localhost:3000/tasks?userId=${userId}`)
        return data;
    },
    updateTask: async(id,updatedTask)=>{
      const updateTask= await  axios.put(`http://localhost:3000/tasks/${id}`, updatedTask)
        return updateTask;
    },
    deleteTask: async(taskId)=>{
        const deleteTask= await axios.delete(`http://localhost:3000/tasks/${taskId}`)
        return deleteTask;
    }

}
