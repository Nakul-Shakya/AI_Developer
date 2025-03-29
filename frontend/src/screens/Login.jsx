import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md px-8 py-6  bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className=" px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-24 px-24 py-24 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?
          <Link to="/register" className="text-blue-400 hover:underline ml-1">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
