import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CustomerDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(user.user.accountType)
  }, [user]);
  return (
    <>
    Customer
    </>
  );
};

export default CustomerDashboard;
