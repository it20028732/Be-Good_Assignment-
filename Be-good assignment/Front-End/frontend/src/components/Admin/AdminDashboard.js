import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllvehicles } from "../../features/Admin/getAllSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { vehicles, isError, message } = useSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getAllvehicles());
  }, []);

  const renderTable = () => {
    return vehicles.map((vehicle) => {
      return (
        <tr
          key={vehicle._id}
          className="border-b bg-white hover:bg-gray-50 border-gray-700 bg-gray-800 hover:bg-[#3a454b]"
        >
          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-white">
            {vehicle.Name}
          </td>
          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-white">
            {vehicle.accountType}
          </td>
          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-white">
            {vehicle.chassisNo}
          </td>
          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-white">
            {vehicle.email}
          </td>
          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-white">
            {vehicle.plateNo}
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <div class="flex justify-center ...">
        <h1 className="my-2 text-3xl font-semibold text-gray-700">
          Admin Page
        </h1>
      </div>
      <div class="flex justify-center ..."><p className="text-gray-500">All Registered Vehicles</p></div>
      <div className="p-10 ">
        <table id="myTable" className="w-full  text-left text-sm text-gray-400">
          <thead className="bg-gray-800  text-xs uppercase text-gray-200 ">
            <tr className="">
              <th scope="col" className="px-6 py-3 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Account Type
              </th>
              <th scope="col" className="px-6 py-3">
                Chassis Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Plate Number
              </th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
