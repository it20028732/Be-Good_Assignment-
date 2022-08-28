import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../../features/authSlice";
import { logout } from "../../../features/authSlice";
import axios from "axios";

const UpdateAcc = ({ setUpdate }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(user.user.Name)
    setEmail(user.user.email)
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `/api/v1/vehicle/updatevehicle/${user.user.docID}`;
      const response = await axios.post(url, {
        Name: name,
        email: email,
      });

      window.alert(response.data.msg);
      if(response.data.data===1){
        window.alert("Sign in Again")
        await dispatch(logout());
        await dispatch(reset());
        navigate("/login");
        setUpdate(false)  
      }
    } catch (error) {
        console.log(error)
        window.alert("error accoured")
    }
  };
  return (
    <>
      <div className="absolute inset-0 z-[5] min-w-full overflow-y-auto">
        <div className="relative flex h-full w-full items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity"></div>

          <div className=" w-full transform overflow-hidden rounded-lg  bg-white shadow-xl transition-all sm:my-8 sm:max-w-lg">
            <div className="relative rounded-lg bg-white shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                onClick={() => setUpdate(false)}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">
                  Update Account
                </h3>
                <form id="form" className="space-y-6" onSubmit={onSubmit}>
                  <div>
                    <label
                      htmlFor="Name"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="Name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Name"
                      defaultValue={user.user.Name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="desc"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="desc"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Email"
                      defaultValue={user.user.email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Update Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateAcc;
