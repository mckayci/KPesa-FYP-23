import classNames from "classnames";
import { useStepperContext } from "../../context/StepperContext";
import Toast from "../Toast.js";
import { useState } from "react";

function PersonalDetails({ userData, setUserData, handleClick }) {
  const [currentError, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData.email);
    console.log(userData.userType);
  };

  const handleNext = () => {
    const newErrors = {};
    if (!userData.userType || !userData.firstName || !userData.lastName) {
      newErrors.adress = "userDetails required";
      Toast({
        message: "Please fill in all the details required",
      }).warning();
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      handleClick("next");
    }
  };

  const handleBack = () => {
    handleClick("Back");
  };

  return (
    <div className="relative">
      <div className="flex flex-col">
        <div className="mx-2 w-full flex-1">
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-kpesa-blue">
                Now for Some Personal Details
              </h3>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-black-900">
                Are you an...?
              </label>
            </div>
            <select
              id="userType"
              className="border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center"
              value={userData["userType"] || ""}
              defaultValue={"None"}
              name="userType"
              onChange={handleChange}
            >
              <option>Investor</option>
              <option>Entrepreneur</option>
            </select>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block text-md mb-2">
                First Name
              </label>
            </div>

            <input
              type="text"
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
              placeholder="First Name"
              value={userData["firstName"] || ""}
              name="firstName"
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block text-md mb-2">
                Last Name
              </label>
            </div>

            <input
              type="text"
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
              placeholder="Last Name"
              value={userData["lastName"] || ""}
              name="lastName"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className=" flex max-sm:flex-col ml-3 justify-between max-w-full py-10">
        <button
          className="text-white bg-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="text-white bg-kpesa-blue hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={handleNext}
          type="submit"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PersonalDetails;
