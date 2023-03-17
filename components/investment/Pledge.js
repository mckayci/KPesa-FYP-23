import Image from "next/image.js";
import logo from "../../public/images/kpesa-logo-300x300.png";
import Nationalities from "../utility/Nationalities.js";
import { useState } from "react";
import bg from "../../public/images/login-photo.jpg";
import Toast from "../Toast";

function Pledge({ userData, setUserData, handleClick }) {
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log("userData", userData);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    //remove commas
    /*
    const sanitizedValue = value.replace(/,/g, "");
    if (!isNaN(sanitizedValue)) {
      setInputValue(parseFloat(sanitizedValue));
    }
    */
    setUserData({ ...userData, [name]: value });
  };

  const handleNext = () => {
    const newErrors = {};
    if (!userData.pledgeAmount) {
      newErrors.pledgeAmount = "Pledge is required";
      Toast({
        message: "You must enter the amount you wish to pledge",
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
        <div class="ml-5">
          <Image
            src={logo}
            alt="KPesa logo"
            className="relative ml-2 h-24 w-24"
          />
          <div className="relative mt-5 left-2 mx-auto">
            <p className="text-3xl text-kpesa-blue inline-block">
              Your Pledge to {userData.campaignName}
            </p>
          </div>
          <div className="flex flex-col ml-2 ">
            <div className="mx-2 w-3/4 flex-1">
              <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                How much would you like to pledge?
              </div>
              <div className="my-2 flex rounded border border-kpesa-blue bg-white p-1">
                <input
                  onChange={handleValueChange}
                  value={userData["pledgeAmount"] || ""}
                  name="pledgeAmount"
                  placeholder="20,0000"
                  className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                  required
                />
              </div>
            </div>
            <div className="mx-2 w-3/4 flex-1">
              <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Would you like to leave a message to {userData.campaignName}?
              </div>
              <textArea
                id="message"
                name="message"
                className="mt-1 block w-full rounded-md border border-kpesa-blue bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange}
                value={userData["message"] || ""}
              />
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
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pledge;
