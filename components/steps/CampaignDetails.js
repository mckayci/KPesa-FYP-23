import { useStepperContext } from "../../context/StepperContext.js";
import Image from "next/image.js";
import logo from "../../public/images/KPesa_logo-300x300.png";

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
        <p className="text-kpesa-alt-blue inline-block text-3xl"> campaign</p>{" "}
        <p className="relative text-3xl text-kpesa-blue inline-block">
          journey
        </p>
      </div>
      <div className="flex flex-col ">
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            What will the name of your campaign be?
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              onChange={handleChange}
              value={userData["campaignName"] || ""}
              name="campaignName"
              placeholder="Anna's Apples"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            How much do you hope to raise?
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 p-1 bg-gray-900 text-white border border-r-0 border-gray-900 rounded-l-md">
              TZS
            </span>
            <input
              onChange={handleChange}
              value={userData["target"] || ""}
              name="target"
              placeholder="eg; 2,000"
              type="text"
              className="w-full flex-1 appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
