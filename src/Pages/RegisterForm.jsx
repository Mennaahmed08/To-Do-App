import {useFormik} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { authApi } from "../services/Auth";
import {useState} from "react"


export default function RegisterForm(){
    const [errorMsg, setErrorMsg] = useState("");
    const handleSubmit = async (values)=>{
         setErrorMsg(""); 
        try {
            await authApi.register(values.userName,values.email,values.password);  
        } catch (error) {
           setErrorMsg(error.message);
        }

    };
    const formik= useFormik({
        initialValues:{
            userName:"",
            email:"",
            password:"",
            confirmPassword:"",
        },
        validationSchema: Yup.object({
            userName: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),

            email: Yup.string()
            .email("Invalid Email Address")
            .required("Email is required"),

            password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric only")
            .required("Password is required"),

            confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Confirm Password is required"),
        }),
       onSubmit: handleSubmit,
    });
    return (
        <>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-rose-900 shadow-2xl rounded-xl space-y-4 mt-20">
            <div>
                <label htmlFor="userName" className="block text-rose-900">UserName :</label>
                <input 
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"                    
                />
                {formik.touched.userName&&formik.errors.userName&&<p className="text-red-500 text-sm">{formik.errors.userName}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-rose-900">Email :</label>
                <input 
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"        
                />
                {formik.touched.email&&formik.errors.email&&<p className="text-red-500 text-sm">{formik.errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-rose-900">Password :</label>
                <input 
                type="password" 
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"
                />
                {formik.touched.password&&formik.errors.password&&<p className="text-red-500 text-sm">{formik.errors.password}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-rose-900">Confirm Password :</label>
                <input 
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"
                />
                {formik.touched.confirmPassword&&formik.errors.confirmPassword&&<p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full bg-rose-900 text-white py-2 rounded hover:bg-rose-800">Sign Up</button>
            <p className="text-center text-[13.1px] text-gray-800"> Already have an account <Link to="/login" className="text-rose-900">Login</Link></p>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </form>
        </>
    )
}