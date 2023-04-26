import { useStepperContext } from "../../context/StepperContext.js";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

export default function Final() {
  const { db, user } = useAuth();
  const { userData } = useStepperContext();
  const { uid } = user || {};

  const CreateCampaign = () => {
    addDoc(collection(db, "campaign"), {
      campaignName: userData.campaignName,
      uid: uid,
      target: userData.target,
      description: userData.campaignInfo,
      campaignPhoto: userData.campaignPhoto,
      createdAt: new Date(),
    });
  };

  return (
    <div className="container md:mt-10">
      <CreateCampaign />
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <div className="mt-3 text-xl font-semibold uppercase text-kpesa-blue">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your campaign has been created.
        </div>
        <a className="mt-10" href="/campaign/view">
          <button className="h-10 px-5 text-kpesa-blue transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-kpesa-blue hover:text-green-100">
            Close
          </button>
        </a>
      </div>
    </div>
  );
}
