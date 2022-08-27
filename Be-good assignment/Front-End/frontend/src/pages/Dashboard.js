import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/authSlice";
import { logout } from "../features/authSlice";
import NavBar from "../components/NavBar";


const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (<> <NavBar />
    </>)
}

export default Dashboard;