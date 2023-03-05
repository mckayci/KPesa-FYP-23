import { useStepperContext } from "../../context/StepperContext.js";
import Image from "next/image.js";
import logo from "../../public/images/KPesa_logo-300x300.png";
import Nationalities from "../utility/Nationalities.js";

function Account() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log("userData", userData);
  };

  return (
    <div className="relative">
      <Image src={logo} alt="KPesa logo" className="relative ml-2 h-24 w-24" />
      <div className="relative mt-5 left-2 mx-auto">
        <p className="text-3xl text-kpesa-blue inline-block">
          Let&apos;s begin your&nbsp;
        </p>
        <p className="text-kpesa-alt-blue inline-block text-3xl"> Pledge</p>{" "}
      </div>
      <div className="flex flex-col ">
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            What is your address?
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              onChange={handleChange}
              value={userData["address"] || ""}
              name="address"
              placeholder="The Watch, Raheen Park"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            What is your nationality?
          </div>
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <Nationalities />
          </select>
        </div>
      </div>
    </div>
  );
}
export default Account;
