import {useFormik} from "formik";
import * as Yup from "yup";
import { tasksApi } from "../services/Tasks";
import useAuth from "../hooks/AuthContext";
import { useEffect } from "react";

export default function TasksForm({editingTask, setEditingTask, fetchTasks,filter ,setFilter, sort, setSort}){
    const {user}= useAuth();
    const handleSubmit = async (values)=>{
        try { 
            if(editingTask){
                await tasksApi.updateTask(editingTask.id,{...values, userId:user.id});
                fetchTasks();
                setEditingTask(null);
            }else{
            await tasksApi.createTask(
                values.taskName,
                values.description,
                values.priority,
                values.dueDate,
                values.status,
                user.id,
            );
        }
        fetchTasks();
        setEditingTask(null);
        } 
        catch(error){
                console.log(error);            
        }
    };
    const formik= useFormik({
            initialValues:{
            taskName:"",
            description:"",
            priority:"undefined",
            dueDate:"",
            status:"pending",
        },
        validationSchema: Yup.object({
            taskName: Yup.string()
                .min(6, "Taskname must be at least 6 characters")
                .required("Taskname is required"),
        
                description: Yup.string()
                .min( 10,"Description must be at least 10 characters")
                .required("Description is required"),
        
                priority: Yup.string()
                .required("Priority is required"),
        
                dueDate: Yup.date()
                .required("Duedate is required"),

                status: Yup.string()
                .required("Status is required")
        }),
        onSubmit: handleSubmit,
    });
    useEffect(()=>{
        if(editingTask){
            formik.setValues({
                taskName: editingTask.taskName,
                description: editingTask.description,
                priority: editingTask.priority,
                dueDate: editingTask.dueDate,
                status: editingTask.status,
            });
        }
    },[editingTask]);  
    const handleDeleteAll = async () => {
        if (!confirm("Are you sure you want to delete all tasks?")) return;
        try {
            const allTasks = await tasksApi.fetchTasks(user.id);
            await Promise.all(allTasks.map(task => tasksApi.deleteTask(task.id)));
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
};  
    return(
        <div>
            <div className="bg-pink-100 rounded-2xl p-6 shadow-md border border-rose-900/10">
                <h2 className="text-2xl font-semibold text-rose-900 mb-4">
                 {editingTask ? "Edit Task" : "Add New Task"}
                </h2>
                <form onSubmit={formik.handleSubmit}  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="taskName" className="block text-gray-700 font-medium mb-1">Task Name</label>
                        <input 
                        type="text"
                        name="taskName"
                        placeholder="Write a clear task name"
                        value={formik.values.taskName} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="w-full p-3 rounded-lg border border-rose-900/30 focus:outline-none focus:ring-2 focus:ring-rose-900"
                        />
                        {formik.touched.taskName&&formik.errors.taskName&&<p className="text-red-500 text-sm">{formik.errors.taskName}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea 
                        name="description"
                        value={formik.values.description} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="w-full p-3 rounded-lg border border-rose-900/30 focus:outline-none"></textarea>
                        {formik.touched.description&&formik.errors.description&&<p className="text-red-500 text-sm">{formik.errors.description}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Priority</label>
                        <select 
                        name="priority"
                        value={formik.values.priority} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}  
                        className="w-full p-3 rounded-lg border border-rose-900/30 focus:outline-none">
                            <option value="">Select Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        {formik.touched.priority&&formik.errors.priority&&<p className="text-red-500 text-sm">{formik.errors.priority}</p>}
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-1">Due Date</label>
                        <input 
                        type="date"
                        name="dueDate"
                        value={formik.values.dueDate} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="w-full p-3 rounded-lg border border-rose-900/30 focus:outline-none" />
                        {formik.touched.dueDate&&formik.errors.dueDate&&<p className="text-red-500 text-sm">{formik.errors.dueDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-gray-700 font-medium mb-1">Status</label>
                        <select 
                        name="status"
                        value={formik.values.status} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} 
                        className="w-full p-3 rounded-lg border border-rose-900/30 focus:outline-none">
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        {formik.touched.status&&formik.errors.status&&<p className="text-red-500 text-sm">{formik.errors.status}</p>}
                    </div>
                    <div className="md:col-span-2 flex items-center gap-3 mt-2">
                        <button type="submit" className="bg-rose-900 text-white px-5 py-2 rounded-lg shadow hover:opacity-95">{editingTask ? "Update Task": "Add Task"}</button>
                        <button type="button" onClick={handleDeleteAll} className="bg-red-100 text-rose-900 px-4 py-2 rounded-lg border border-rose-900/20 hover:bg-red-200">Delete All</button>
                    </div>
                </form>
            </div>
            <div className="flex flex-wrap gap-3 mb-4 mt-3">
                <div className="flex gap-2">
                    <div className=" bg-pink-100 border border-rose-900/30 rounded-md px-4 py-3 flex items-center justify-between shadow-sm">
                        <label htmlFor="statusFilter" className="text-sm font-medium text-rose-900">Filter by status:</label>
                        <select
                        id="statusFilter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="ml-3 border border-rose-900/20 rounded-md px-3 py-1 text-sm text-gray-700 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-rose-900/40"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-auto p-2 rounded-lg border border-rose-900/30 bg-pink-100 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-900/30"
                >
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="priority">Sort by Priority</option>
                </select>
            </div>
        </div>
    )
}
