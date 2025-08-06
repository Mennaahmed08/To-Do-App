import { useFormik} from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authApi } from "../services/Auth";
import useAuth from "../hooks/AuthContext";

export default function Login(){
    const {saveUser}= useAuth();
    const navigate= useNavigate();
    const handleSubmit= async (values)=>{
        try {
          const user=  await authApi.login(values.email,values.password);
          console.log({user});
          saveUser(user);
          navigate("/tasks");
        } catch (error) {
            console.log(error)
        }
    }

        const formik= useFormik({
        initialValues:{
            email:"",
            password:"",
        },

        validationSchema: Yup.object({
            email: Yup.string()
            .email("Invalid Email Address")
            .required("Email is Requird"),
            password: Yup.string()
            .min(6,"Password must be at least 6 characters")
            .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric only")
            .required("Password is required"),
        }),
        onSubmit: handleSubmit,
    });
    return(
        <>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 bg-white  shadow-rose-900 shadow-2xl rounded-xl space-y-4 mt-20">
            <div>
                <label htmlFor="email" className="block  text-rose-900 ">Email</label>
                <input 
                type="email"
                name="email"
                autoComplete="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"
                 />
                 {formik.touched.email&&formik.errors.email&&<p className="text-red-500 text-sm">{formik.errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block  text-rose-900 ">Password</label>
                <input 
                type="password"
                name="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"
                />
                {formik.touched.password&&formik.errors.password&&<p className="text-red-500 text-sm">{formik.errors.password}</p>}
            </div>
            <button type="submit" className="w-full bg-rose-900 text-white py-2 rounded hover:bg-rose-800">Login</button>
            <p className="text-center text-[13.1px] text-gray-800"> Don't have an account? <Link to="/register" className="text-rose-900">Sign Up</Link></p>
            </form>        
        </>
    )
}