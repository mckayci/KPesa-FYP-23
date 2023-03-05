import { useState } from "react";
import Stepper from "/components/Stepper.js";
import StepperControl from "/components/StepperControl.js";
import { UseContextProvider } from "/context/StepperContext.js";
import Header from "../components/Hamburger";
import { useStepperContext } from "../context/StepperContext";
import LoginDetails from "../components/signup/LoginDetails";
import PersonalDetails from "../components/signup/PersonalDetails";
import SignUpSuccess from "../components/signup/SignUpSuccess";
import { useAuth } from "../hooks/useAuth";

function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Login Details", "Personal Details", "Confirmation"];
  const [userData, setUserData] = useState("");
  const { signUp } = useAuth();

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <LoginDetails userData={userData} setUserData={setUserData} />;
      case 2:
        return (
          <PersonalDetails userData={userData} setUserData={setUserData} />
        );
      case 3:
        return <SignUpSuccess />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    //Check if steps within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

    if (currentStep === 2 && direction === "next") {
      try {
        console.log("userData", userData);
        signUp(
          userData.email,
          userData.password,
          userData.userType,
          userData.firstName,
          userData.lastName
        );
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <div className="overflow-none h-screen w-full relative">
      <Header />
      <div className="bg-no-repeat bg-cover bg-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="bg-white w-full h-screen  p-5 sm:w-1/2">
          {/*Stepper*/}
          <div className="horizontal container mt-5">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="my-10 p-10">{displayStep(currentStep)}</div>
          </div>
          {/*navigation button*/}
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default SignUp;
