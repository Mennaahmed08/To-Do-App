

export default function Task({taskName,description,priority,dueDate,status ,onEdit, onDelete, taskId, onToggle}){
    return(
        <>
         <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <div>
                <div className="flex items-center gap-3">
                    <h3  className={`text-lg font-semibold ${status === "completed" ? "line-through text-gray-500" : "text-gray-800"}`}>{taskName}</h3>
                    <span className="text-sm px-2 py-1 rounded-full text-white bg-rose-900/80">{priority}</span>                          
                </div>
                <p className="text-sm text-gray-700">{description}</p>
                 <p className="text-sm text-gray-600 mt-1">Due: <span className="font-medium">
                    {dueDate}
                    </span>
                  </p>
                <p className={`text-sm ${status === "completed"? "text-green-600": "text-amber-600"}`}>{status}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={onToggle} className="px-3 py-1 rounded-md bg-amber-50 border border-rose-900/20 text-rose-900">
                    {status === "pending" ? "Mark Done" : "Mark Pending"}
                  </button>
                <button onClick={onEdit}  className="px-3 py-1 rounded-md bg-pink-100 text-rose-900 border border-rose-900/20">Edit</button>
                <button onClick={()=> onDelete(taskId)} className="px-3 py-1 rounded-md bg-rose-900 text-white">Delete</button>
            </div>
        </div>
        </>
    )
}