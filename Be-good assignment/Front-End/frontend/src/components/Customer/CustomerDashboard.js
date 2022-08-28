import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { reset } from "../../features/authSlice";
import { logout } from "../../features/authSlice";
import UpdateAcc from "./SubComponents/UpdateAcc";

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  //click event to load update component
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log(user.user.docID);
  }, [user]);

  //delete an account
  const DeleteAcc = async() => {
    let response = prompt("Enter Email Address to DELETE\nNOTE THIS WILL DELETE YOUR ACCOUNT");
    if(response===null){
      return
    }
    if(response===user.user.email){
      console.log("email matched")
      if(window.confirm("Are You sure You want to delete Your account")){
        console.log("deleted")
        try { 
        const url = `/api/v1/vehicle/deletevehicle/${user.user.docID}`;
        await axios.delete(url);
        await dispatch(logout());
        await dispatch(reset());
        navigate("/");
          
        } catch (error) {
          console.log(error)
          window.alert('server error')
        }
      }else{
        return
      }
    }else{
      window.alert("email not matched")
      return;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="my-2 text-3xl font-semibold text-gray-700">Account</h1>
      </div>
      <div className="p-32">
        <div className="rounded-lg bg-gray-50 shadow-2xl  p-10">
          <div className="relative z-0 mb-6 w-full group">
            <div className="mb-6">
              <div class="grid gap-2 grid-cols-2">
                <div className="  text-lg rounded-lg  block w-3/4 p-2.5 bg-gray-200  text-black">
                  <span className="my-2 font-semibold text-gray-700">
                    Name:{" "}
                  </span>
                  {user.user.Name}
                </div>
                <div className="  text-lg rounded-lg  block w-3/4 p-2.5 bg-gray-200  text-black">
                  <span className="my-2 font-semibold text-gray-700">
                    Email:{" "}
                  </span>
                  {user.user.email}
                </div>
                <div className="  text-lg rounded-lg  block w-3/4 p-2.5 bg-gray-200  text-black">
                  <span className="my-2 font-semibold text-gray-700">
                    Number Plate:
                  </span>{" "}
                  {user.user.plateNo}
                </div>
                <div className="text-lg rounded-lg  block w-3/4 p-2.5 bg-gray-200  text-black">
                  <span className="my-2 font-semibold text-gray-700">
                    Chassis Number:
                  </span>{" "}
                  {user.user.chassisNo}
                </div>
                <div class="flex justify-start ...">
                  <button class="  bg-green-700  hover:bg-green-300 hover:text-black text-white font-bold py-2 px-4 rounded inline-flex items-center"
                     onClick={() => {
                      setUpdate(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3"
                      />
                    </svg>
                    <span>Update</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="flex justify-end ...">
          <button class="  bg-red-600  hover:bg-red-400 hover:text-black text-white font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={DeleteAcc}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            <span>Delete Account</span>
          </button>
        </div>
        {update && <UpdateAcc  setUpdate={setUpdate} />}
      </div>
    </>
  );
};

export default CustomerDashboard;
