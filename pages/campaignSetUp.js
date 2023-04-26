import { useState } from "react";
import Stepper from "../components/Stepper.js";
import StepperControl from "../components/StepperControl.js";
import { UseContextProvider } from "../context/StepperContext.js";

import Account from "../components/steps/CampaignDetails.js";
import Media from "../components/steps/Media.js";
import Details from "../components/steps/Details.js";
import Final from "../components/steps/Final.js";

function NewCamapign() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Campaign", "Details", "Media", "Complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Media />;
      case 4:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // This checks the steps are eithin bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl lg:w-1/2 h-screen">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>
      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}
export default NewCamapign;
