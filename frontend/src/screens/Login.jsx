import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err.response.data));
  }

  return (
    <div className="max-w-full h-screen flex justify-center items-center container px-4 mx-auto bg-gray-100 dark:bg-gray-800">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Login
          </h2>
        </div>
        <form onsubmit={submitHandler}>
          <div className="mb-6">
            <label
              className="block mb-2 font-extrabold text-gray-900 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onchange={(e) => setEmail(e.target.value)}
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-gray-700 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow border-2 border-indigo-900 rounded"
              type="email"
              id="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 font-extrabold text-gray-900 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onchange={(e) => setPassword(e.target.value)}
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-gray-700 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow border-2 border-indigo-900 rounded"
              type="password"
              id="password"
            />
          </div>

          <br />

          <button className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">
            Login
          </button>
          <p className="text-center font-extrabold text-gray-900 dark:text-gray-300">
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-red-600 hover:underline">
              create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
