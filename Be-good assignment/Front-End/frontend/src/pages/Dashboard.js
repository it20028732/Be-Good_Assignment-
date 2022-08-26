import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/authSlice";
import { logout } from "../features/authSlice";


const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = async () => {
        await dispatch(logout());
        await dispatch(reset());
        navigate("/");
      };
    return (<>Dashboard
            <a 
                href=""
                  onClick={onLogout}
                >
                  Sign Out
                </a>

    </>)
}

export default Dashboard;