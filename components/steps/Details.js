import { useStepperContext } from "../../context/StepperContext.js";

function Details() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 max-md:mb-3 text-gray-500 text-xs leading-8 uppercase leading-none">
          Please provide a description of your campaign
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <textarea
            onChange={handleChange}
            value={userData["campaignInfo"] || ""}
            name="campaignInfo"
            placeholder="Write your description here"
            className="relative py-2 my-3 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
export default Details;
