import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/authSlice";
import { logout } from "../features/authSlice";
import NavBar from "../components/NavBar";
import AdminDashboard from "../components/Admin/AdminDashboard";
import CustomerDashboard from "../components/Customer/CustomerDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    
  }, [user]);
  return (
    <>
      <NavBar />
      <div>
        {/* Admin Content */}
        {user.user.accountType === "admin" && <AdminDashboard />}
        {/* Customer Content */}
        {user.user.accountType === "customer" && <CustomerDashboard />}
      </div>
    </>
  );
};

export default Dashboard;
