import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuth } from "/hooks/useAuth";
import Image from "next/image";
import Header from "/components/Hamburger";
import Footer from "/components/Footer";

function UserCampaign() {
  const { db } = useAuth();
  const {
    query: { id },
    isReady,
  } = useRouter();

  const [campaign, setCampaign] = useState([]);
  const [campaignCreator, setCamapignCreator] = useState([]);

  useEffect(() => {
    if (isReady) {
      const q = query(collection(db, "campaign"));
      const handleSnapshot = (querySnapshot) => {
        const data = querySnapshot.docs.reverse().map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCampaign(data);
      };
      // load initial docs
      getDocs(q).then(handleSnapshot);

      // Respond to new docs
      onSnapshot(q, handleSnapshot);
    }
  }, [db, id, isReady]);
  const currentCampaign = campaign.find(
    (thisCampaign) => thisCampaign.id === id
  );

  useEffect(() => {
    if (isReady) {
      const q = query(collection(db, "userData"));
      const handleSnapshot = (querySnapshot) => {
        const data = querySnapshot.docs.reverse().map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCamapignCreator(data);
      };
      // load initial docs
      getDocs(q).then(handleSnapshot);

      // Respond to new docs
      onSnapshot(q, handleSnapshot);
    }
  }, [db, id, isReady]);

  const creatorID = currentCampaign ? currentCampaign.uid : "loading";
  const titleName = currentCampaign ? currentCampaign.campaignName : "loading";
  const goal = currentCampaign ? currentCampaign.target : "loading";
  const description = currentCampaign ? currentCampaign.description : "loading";
  const photoURL = currentCampaign ? currentCampaign.campaignPhoto : "loading";

  const campaignCreatorDetails = campaignCreator.find(
    (thisCreator) => thisCreator.id === creatorID
  );

  const firstName = campaignCreatorDetails
    ? campaignCreatorDetails.firstName
    : "loading";

  const lastName = campaignCreatorDetails
    ? campaignCreatorDetails.lastName
    : "loading";

  const nationality = campaignCreatorDetails
    ? campaignCreatorDetails.nationality
    : "loading";

  console.log("goal", goal);

  const campaignOverview = () => {
    return (
      <div className="max-w-full p-6 mb-5 max-sm:mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Goal:&nbsp;
            <p className=" inline-block ">
              {new Intl.NumberFormat("en-EN", {
                style: "currency",
                currency: "TZS",
                // notation: "compact",
              }).format(Number(goal))}
            </p>
          </h5>
        </a>
        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">
          {" "}
          Please donate to&nbsp; {titleName} &nbsp; today!{" "}
        </p>
        <button
          type="button"
          className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-1"
        >
          Invest Today
        </button>
        <button
          type="button"
          className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Share
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-h-screen  bg-white overflow-auto">
      <Header />
      <div className="">
        <div className="w-3/4  mx-auto">
          <div className="text-5xl text-kpesa-blue capitalize font-semibold my-10  max-sm:ml-0 ">
            {titleName}
          </div>
          <div className="md:grid md:grid-cols-4 md:gap-4">
            <div className="md:col-span-3">
              <img
                src={photoURL}
                alt="KPesa logo"
                className=" max-w-full  mx-auto rounded-lg  border-kpesa-blue bg-white dark:shadow-gray-800"
              />
              <div className="sm:hidden"> {campaignOverview()}</div>
              <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-4 md:mb-10 max-sm:mb-10">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                  About&nbsp; {titleName}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </div>
            <div
              className="  text-4xl rounded-lg text-center  text-gray-900 w-full  "
              id="goal-container"
            >
              <div className="sm:col-span-1 max-sm:hidden">
                {campaignOverview()}

                <div
                  id="creatorDetails"
                  className="max-w-full p-6 mb-5 max-sm:mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      About the creator
                    </h5>
                  </a>
                  <p class="mb-3 text-sm text-white">
                    {" "}
                    Name:&nbsp; {firstName} &nbsp; {lastName}
                  </p>
                  <p class="mb-3 text-sm text-white">
                    Nationality:&nbsp; {nationality}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default UserCampaign;
