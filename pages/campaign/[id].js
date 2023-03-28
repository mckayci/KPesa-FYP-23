import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

import UserCampaign from "../../components/investment/Campaign[id]";

import InvestorDetails from "../../components/investment/PersonalDetails";
import Pledge from "../../components/investment/Pledge";
import PledgeReview from "../../components/investment/PledgeReview";
import PledgeSuccess from "../../components/investment/PledgeSuccess";

function CampaignViewer() {
  const { db } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const steps = [
    "Campaign",
    "Investor Details",
    "Pledge Details",
    "Confirmation",
    "Success",
  ];

  //step handler
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <UserCampaign
            userData={userData}
            setUserData={setUserData}
            handleClick={handleClick}
          />
        );
      case 2:
        return (
          <InvestorDetails
            userData={userData}
            setUserData={setUserData}
            handleClick={handleClick}
          />
        );
      case 3:
        return (
          <Pledge
            userData={userData}
            setUserData={setUserData}
            handleClick={handleClick}
          />
        );
      case 4:
        return (
          <PledgeReview
            userData={userData}
            setUserData={setUserData}
            handleClick={handleClick}
          />
        );

      case 5:
        return (
          <PledgeSuccess
            userData={userData}
            setUserData={setUserData}
            handleClick={handleClick}
          />
        );
      default:
        return null;
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    //Check if steps within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    console.log("userData", userData);

    if (currentStep === 4 && direction === "next") {
      try {
        console.log("userData", userData);
        const reviewRef = doc(
          collection(db, "campaign", userData.campaignID, "pledges")
        );
        await setDoc(reviewRef, {
          id: reviewRef.id,
          campaignID: userData.campaignID,
          investorId: userData.userID,
          pledgeAmount: userData.pledgeAmount,
          investorAddress: userData.address,
          investorMessage: userData.message,
        });
        setCurrentStep(newStep);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <div>
      {/*Stepper*/}
      <div>{displayStep(currentStep)}</div>
    </div>
  );
}

export default CampaignViewer;
