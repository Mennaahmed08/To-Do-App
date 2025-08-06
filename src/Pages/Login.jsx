import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authApi } from "../services/Auth";
import useAuth from "../hooks/AuthContext";

export default function Login() {
  const { saveUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const user = await authApi.login(values.email, values.password);
      console.log({ user });
      saveUser(user);
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric only")
        .required("Password is required"),
    }),

    onSubmit: handleSubmit,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md w-full mx-auto p-6 bg-white shadow-2xl shadow-rose-900 rounded-xl space-y-6 mt-16
                   sm:max-w-lg sm:p-8
                   md:max-w-xl
                   lg:max-w-lg
                   xl:max-w-md"
      >
        <div>
          <label htmlFor="email" className="block text-rose-900 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border border-gray-300 px-3 py-2 w-full rounded 
                       focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-rose-900 font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="border border-gray-300 px-3 py-2 w-full rounded
                       focus:outline-2 focus:outline-offset-2 focus:outline-rose-800 mt-2 text-gray-700"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-rose-900 text-white py-3 rounded hover:bg-rose-800 transition-colors duration-300"
        >
          Login
        </button>

        <p className="text-center text-[13.1px] text-gray-800">
          Don't have an account?{" "}
          <Link to="/register" className="text-rose-900 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}
