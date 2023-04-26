import { useStepperContext } from "../../context/StepperContext.js";
import Image from "next/image.js";
import logo from "../../public/images/kpesa-logo-300x300.png";
import { useForm } from "react-hook-form";
import Toast from "../Toast.js";
import { useState } from "react";

function LoginDetails({ userData, setUserData, handleClick }) {
  const methods = useForm({ mode: "onBlur" });
  const [currentError, setError] = useState({});

  const {
    register,
    formState: { errors },
  } = methods;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNext = () => {
    const newErrors = {};
    if (!userData.email || !userData.password) {
      newErrors.adress = "Email/Password is required";
      Toast({
        message: "Email/Password is required",
      }).warning();
    } else if (userData.password != userData.confirmPassword) {
      newErrors.adress = "Passwords don't match";
      Toast({
        message: "Passwords do not match",
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
    <div className="relatvie">
      <Image src={logo} alt="KPesa logo" className="relative ml-2 h-24 w-24" />
      <div className="flex flex-col">
        <div className="mx-2 w-full flex-1">
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block text-md mb-2">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
              placeholder="email"
              onChange={handleChange}
              value={userData["email"] || ""}
              name="email"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block text-md mb-2">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
              placeholder="password"
              onChange={handleChange}
              value={userData["password"] || ""}
              name="password"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-black-900">
                Confirm Password
              </label>
            </div>
            <input
              type="password"
              {...register("password_confirm", {
                required: "Verify your password",
              })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
              placeholder="Same password again"
              value={userData["confirmPassword"] || ""}
              onChange={handleChange}
              name="confirmPassword"
            />
            {errors.password_confirm && (
              <p className="text-red-400">{errors.password_confirm.message}</p>
            )}
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
export default LoginDetails;
