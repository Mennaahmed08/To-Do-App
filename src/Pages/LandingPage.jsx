import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl shadow-rose-900
                    sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
                    sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-6 text-center sm:text-left">
        To Do List Project
      </h1>
      <p className="mb-4 text-gray-700 text-base sm:text-lg leading-relaxed">
        This project helps you organize your daily tasks efficiently. You can add, edit, and delete your tasks easily.
      </p>
      <p className="mb-4 text-gray-700 text-base sm:text-lg leading-relaxed">
        <span className="font-semibold text-rose-900">Note:</span>{" "}
        To add{" "}
        <Link to="/tasks" className="text-rose-900 underline hover:text-rose-700 transition-colors duration-300">
          Tasks
        </Link>
        , please login first.
      </p>
    </div>
  );
}
