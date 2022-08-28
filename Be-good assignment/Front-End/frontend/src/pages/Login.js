import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate(); //to navigate
  const dispatch = useDispatch();

  //usestate
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      window.alert(message);
    }
    if (isSuccess || user) {
      console.log(user);
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (credentials === "" || password === "") {
      window.alert("enter both fields return");
      return;
    }
    const userData = {
      credential: credentials,
      password: password,
    };
    dispatch(login(userData));
  };
  //loading animation
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <nav class=" sm:px-4 py-5  bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Vehicle Registration Managment
            </span>
          </a>
          <a
            href="/register"
            class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Register
          </a>
        </div>
      </nav>
      <div className="flex min-h-screen items-center bg-white">
        <div className="container mx-auto">
          <div className="mx-auto mb-10 max-w-md">
            <div className="flex flex-col items-center text-center">
              <h1 className="my-2 text-3xl font-semibold text-gray-700">
                Sign in
              </h1>
              <p className="text-gray-500">Sign in to access your account</p>
            </div>
            <div className="my-3 bg-gray-200 p-6">
              <form action="">
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-[#e2a500] focus:outline-none focus:ring focus:ring-orange-100"
                    value={credentials}
                    onChange={(e) => setCredentials(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm text-gray-600"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-[#e2a500] focus:outline-none focus:ring focus:ring-orange-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="button"
                    className="w-full rounded-md bg-gray-900 hover:bg-gray-700  px-3 py-2 text-white focus:outline-none"
                    onClick={(e) => onSubmit(e)}
                  >
                    Sign in
                  </button>
                  
                </div>
                <div class="flex justify-center ...">
                <p className="text-gray-500 ">Don't have an account? <a className="text-blue-500" href="/register" >Register Here</a></p>
                </div>
              </form>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Login;
