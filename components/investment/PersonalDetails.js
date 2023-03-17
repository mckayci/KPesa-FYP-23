import Image from "next/image.js";
import logo from "../../public/images/kpesa-logo-300x300.png";
import Nationalities from "../utility/Nationalities.js";
import bg from "../../public/images/login-photo.jpg";
import { useState } from "react";
import Toast from "../Toast";

function InvestorDetails({ userData, setUserData, handleClick }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log("userData", userData);
  };
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!userData.address) {
      newErrors.adress = "Address is required";
      Toast({
        message: "You must enter your address",
      }).warning();
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      handleClick("next");
    }
  };

  const handleBack = () => {
    handleClick("Back");
  };

  return (
    <div class="md:flex md:items-center md:justify-center h-screen">
      <Image
        className="fixed  max-md:hidden"
        alt={"h"}
        src={bg}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      ></Image>
      <div className="relative mx-auto md:w-3/4 py-10 md:bg-gray-100 opacity-90 rounded-lg my-auto shadow-md z-50">
        <div className="md:ml-10">
          <div className="max-sm:flex-row relative mx-auto ">
            <Image
              src={logo}
              alt="KPesa logo"
              className="relative ml-2 h-24 w-24"
            />
            <div className="relative mt-5 left-2 mx-auto">
              <p className="text-3xl text-kpesa-blue inline-block">
                Let&apos;s begin your&nbsp;
              </p>
              <p className="text-kpesa-alt-blue inline-block text-3xl">
                {" "}
                Pledge
              </p>{" "}
            </div>
            <div className="flex flex-col ">
              <div className="mx-2 w-3/4 flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                  What is your address?
                </div>
                <div className="my-2 flex rounded border border-kpesa-blue bg-white p-1">
                  <input
                    onChange={handleChange}
                    value={userData["address"] || ""}
                    name="address"
                    placeholder="The Watch, Raheen Park"
                    className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="mx-2 w-3/4 flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                  What is your nationality?
                </div>
                <select
                  id="country"
                  className="mt-1 block w-full rounded-md border border-kpesa-blue bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                  value={userData["nationality"] || ""}
                >
                  <Nationalities />
                </select>
              </div>
              <div className=" flex max-sm:flex-col ml-3 justify-between w-3/4 py-10">
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default InvestorDetails;
