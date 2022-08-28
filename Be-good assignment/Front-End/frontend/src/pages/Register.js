import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { modern } from "./Validation methods/Validate";

const Register = () => {
  //hook to display validation status
  const [validateStatus, setValidateStatus] = useState(0);
  //enable diable submit button based o validation
  const [disabled, setDisabled] = useState(true);
  //vehicle plate type
  const [vehicleType, setVehicleType] = useState("");

  //form data
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [email, setEmail] = useState("");

  //validate number plate
  const validatePlate = async (e) => {
    e.preventDefault();
    if (plateNo === "") {
      window.alert("empty fields");
      return;
    }
    try {
      const url = `/api/v1/vehicle/${plateNo}`;
      const response = await axios.post(url);

      //if number plate is modern
      if (response.data.data === "modern") {
        const response = await modern(plateNo);
        console.log(response);
        setValidateStatus(response);

        if (1) {setDisabled(false);} 
        else {setDisabled(true);}

      } else if (response.data.data === "vintage") {

      } else if (response.data.data === "old") {
      } else {
        window.alert("error in validating");
      }
    } catch (error) {
      console.log(error);
      window.alert("error in server");
    }
  };
  //to require validation if number plate is changed
  useEffect(() => {
    setValidateStatus(0);
    setDisabled(true);
  }, [plateNo]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("works");
  };
  return (
    <div>
      <nav class=" sm:px-4 py-5  bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
              Vehicle Registration Managment
            </span>
          </a>
          <a
            href="/login"
            class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Login
          </a>
        </div>
      </nav>
      <div className="mt-10 sm:mt-0 pt-10 pr-56 pl-56 ">
        <div className="md:col-span-1">
          <div className="px-1 sm:px-0">
            <div className="flex justify-center ...">
              <h1 className="my-2 text-3xl  font-semibold text-gray-700">
                Registration
              </h1>
            </div>
            <br />
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-lg bg-gray-50 shadow-2xl  p-10"
        >
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-black border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="name"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-black border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-black border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                type="text"
                //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="plateNo"
                id="plateNo"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-black border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setPlateNo(e.target.value)}
              />
              <label
                for="plateNo"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Plate number (KN-7880)
              </label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
              {plateNo}
              <button onClick={validatePlate}>
                {/* if needed to be validated */}
                {validateStatus === 0 && (
                  <div class=" hover:bg-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-300 text-green">
                    validate number plate
                  </div>
                )}
                {/* if failed to validate */}
                {validateStatus === -1 && (
                  <div class=" hover:bg-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-red-300 text-black">
                    invalid number plate (re-try)
                  </div>
                )}
                {/* if validated succesfully */}
                {validateStatus === 1 && (
                  <div class=" hover:bg-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-green-300 text-black">
                    validated
                  </div>
                )}
              </button>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                type="text"
                //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="chassisNo"
                id="chassisNo"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-black border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="chassisNo"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Chassis number
              </label>
            </div>

            <div class="relative z-0 mb-6 w-full group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-black border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
          </div>
          {disabled === true && (
            <>
              <button
                title="Validate Plate"
                type="submit"
                class="text-white hover:bg-red-500 bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={disabled}
              >
                Register
              </button>
            </>
          )}
          {disabled === false && (
            <button
              type="submit"
              class="text-white hover:bg-green-700 bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={disabled}
            >
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
