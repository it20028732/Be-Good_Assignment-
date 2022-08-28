import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/authSlice";
import { logout } from "../features/authSlice";
import NavBar from "../components/NavBar";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const ViewALL = (e) => {
    if (window.confirm("Login With Admin Credentials\nEmail: admin@gmail.com\npassword: admin") === true) {
      navigate('/login')
    } else {
      return
    }
  }

  return (
    <>
      <div>
        <nav class=" sm:px-4 py-2.5  bg-gray-900">
          <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" class="flex items-center">
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Vehicle Registration Managment
              </span>
            </a>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/login"
                    class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="p-1">
          <button
            type="button"
            className="text-white focus:outline-none font-medium rounded-lg text-base px-6 py-3.5 text-center bg-gray-800 hover:bg-gray-700 focus:ring-blue-800"
            onClick={ViewALL}
          >
            View All registrations
          </button>
        </div>
        <div className="flex min-h-screen items-center bg-white">
          <div className="container mx-auto">
            <div className="mx-auto mb-5 max-w-md">
              <div class="flex justify-center ...">
                <div className="p-2 ">
                  <a
                    href="/login"
                    className="block p-20 max-w-sm bg-gray-800 rounded-lg border border-gray-700 shadow-md hover:bg-gray-700"
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Login
                    </h5>
                  </a>
                </div>
                <div>
                  <div className="p-2">
                    <a
                      href="/register"
                      className="block p-20 max-w-sm bg-gray-800 rounded-lg border border-gray-700 shadow-md hover:bg-gray-700"
                    >
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Register
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
