import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ListTodo } from "lucide-react";
import useAuth from "../hooks/AuthContext";

export default function NavBar() {
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <>
      <nav
        className="
          flex flex-wrap justify-between items-center
          px-4 py-4
          bg-pink-100 rounded-3xl
          mx-3 mt-3
          sm:px-7 sm:py-5
        "
      >
        <div className="flex items-center px-2">
          <ListTodo size={24} className="text-rose-900" />
          <Link
            to="/"
            className="text-rose-900 pl-2 font-bold text-lg sm:text-xl"
          >
            To Do List
          </Link>
        </div>

        <ul
        >
          {!user && (
            <li>
              <Link
                to="/login"
              className="bg-rose-900 text-amber-50 px-4 py-2 rounded-4xl focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 active:bg-rose-800"
                
              >
                Login
              </Link>
            </li>
          )}
          {user && (
            <li>
              <button
                onClick={handleLogout}
            className="bg-rose-900 text-amber-50 px-4 py-2 rounded-4xl focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 active:bg-rose-800 cursor-pointer
                "
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
