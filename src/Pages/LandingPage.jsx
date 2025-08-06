import { Link } from "react-router";


export default function LandingPage(){
    return(
        <>
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-rose-900 shadow-2xl">
            <h1 className="text-3xl font-bold text-rose-900 mb-4">To Do List Project</h1>
            <p className="mb-4 text-gray-700">
                This project helps you organize your daily tasks efficiently. You can add, edit, and delete your tasks easily.
            </p>
            <p className="mb-4 text-gray-700">
                <span className="font-semibold text-rose-900">Note:</span> To add <Link to="/tasks" className="text-rose-900 underline">Tasks</Link>, please login first.
            </p>
        </div>
        </>
    );
}