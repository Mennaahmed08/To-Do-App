import React from "react"
import {Routes,Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import Login from "./Pages/Login"
import RegisterForm from "./Pages/RegisterForm"
import NavBar from "./Components/NavBar"
import Tasks from "./Pages/Tasks"
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
    return (
      <>
      <NavBar />
      <Routes>
        <LandingPage /> 
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
      </Routes>
      </>
    )
}

