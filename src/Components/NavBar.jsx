import React from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { ListTodo } from 'lucide-react';
import useAuth from "../hooks/AuthContext";

export default function NavBar(){
    const { user, clearAuth} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        clearAuth();
        navigate("/");
    };
    return(
        <>
        <nav className="flex justify-between px-7 py-5 rounded-4xl mt-3 mr-3 ml-3 items-center bg-pink-100">
            <div className=" flex px-4">
                <ListTodo size={20} className="text-rose-900 mt-0.5" />
                <p className="text-rose-900 pl-2 font-bold">To Do List</p>
            </div>
            <ul>
                {!user && (
                    <li>
                        <Link to="/login" className="bg-rose-900 text-amber-50 px-4 py-2 rounded-4xl focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 active:bg-rose-800">
                            Login
                        </Link>
                    </li>
                )}
                {user && (
                    <li>
                        <button 
                            onClick={handleLogout} 
                            className="bg-rose-900 text-amber-50 px-4 py-2 rounded-4xl focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 active:bg-rose-800"
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
        <Outlet/>
        </>
    )
}