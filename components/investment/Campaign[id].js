import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import Toast from "../Toast";
import { useEffect, useRef, useState } from "react";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import Image from "next/image";
import Header from "../Hamburger";
import Footer from "../Footer";
import { useStepperContext } from "../../context/StepperContext";

function UserCampaign({ userData, setUserData, handleClick }) {
  const { db, user } = useAuth();
  const { uid, displayName } = user || {};
  const [pledgeData, setPledgeData] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    const q = query(collection(db, `campaign/${id}/pledges`));
    console.log("Campaign Pledges", `campaign/${id}/pledges`);

    const handleSnapshot = (QuerySnapshot) => {
      const data = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const docId = QuerySnapshot.docs.map((doc) => ({
        id: doc.id,
      }));
      setPledgeData(data);

      console.log("pledged Data", pledgeData);
    };

    //load initial docs
    getDocs(q).then(handleSnapshot);
    //Respond to new docs
    onSnapshot(q, handleSnapshot);
  }, [id]);

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

  const handleChange = () => {
    setUserData({
      campaignName: titleName,
      campaignID: currentCampaign.id,
      userID: uid,
      userName: displayName,
      campaignPhoto: photoURL,
    });
    handleClick("next");
  };

  const calculatePledgePercentage = () => {
    const totalPledgeAmount =
      pledgeData && pledgeData.length > 0
        ? pledgeData.reduce(
            (total, pledge) => total + parseInt(pledge.pledgeAmount),
            0
          )
        : 0;

    console.log(pledgeData.pledgeAmount);

    console.log("pledgeAmoiunt", totalPledgeAmount);

    const pledgePercentage =
      ((totalPledgeAmount / goal) * 100).toFixed(2) + "%";
    console.log("pledge Percent", pledgePercentage);

    return pledgePercentage;
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const campaignOverview = () => {
    const currentURL =
      typeof window !== "undefined" ? window.location.href : "";

    return (
      <div>
        {isOpen && (
          <div
            id="popup-modal"
            tabindex="-1"
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto bg-gray-100 bg-opacity-75"
          >
            <div class="relative w-full h-full max-w-md md:h-auto">
              <div class="relative  rounded-lg shadow bg-white p-10">
                <div className="border-b-2 border-kpesa-alt-blue  mb-5">
                  <button
                    onClick={closeModal}
                    type="button"
                    class="absolute top-3 right-2.5 text-kpesa-blue bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>

                  <div className="text-xl  my-4 font-semibold text-kpesa-blue bg-opacity-80 ">
                    Share {titleName} to Social Media!{" "}
                  </div>
                </div>
                <div class=" text-center">
                  <div className="py-3">
                    <FacebookShareButton
                      className="inline-flex items-center px-5 py-2.5 text-center text-white bg-blue-500 mx-2 "
                      url={currentURL}
                    >
                      <FacebookIcon
                        className="transition ease-in-out hover:-translate-y-1"
                        size={32}
                        round={true}
                        quote="Check out this awesome campaign on KPesa, a crowdfunding platform made for women!!"
                      />
                    </FacebookShareButton>

                    <EmailShareButton
                      className="inline-flex items-center px-5 py-2.5 text-center text-white bg-blue-500 mx-2"
                      url={currentURL}
                      subject="Check out this awesome campaign on KPesa, a crowdfunding platform made for women!"
                    >
                      <EmailIcon
                        className="transition ease-in-out hover:-translate-y-1"
                        size={32}
                        round={true}
                      />
                    </EmailShareButton>

                    <WhatsappShareButton
                      className="inline-flex items-center px-5 py-2.5 text-center text-white bg-blue-500 mx-2"
                      url={currentURL}
                      title="Check out this awesome campaign on KPesa, a crowdfunding platform made for women!!"
                    >
                      <WhatsappIcon
                        className="transition ease-in-out hover:-translate-y-1"
                        size={32}
                        round={true}
                      />
                    </WhatsappShareButton>

                    <FacebookMessengerShareButton
                      className="inline-flex items-center px-5 py-2.5 text-center text-white bg-blue-500 mx-2"
                      url={currentURL}
                    >
                      <FacebookMessengerIcon
                        className="transition ease-in-out hover:-translate-y-1"
                        size={32}
                        round={true}
                      />
                    </FacebookMessengerShareButton>
                  </div>
                  <div>
                    <p className="inline-flex text-black font-medium text-sm mx-2 p-2 rounded-md">
                      {" "}
                      Or Copy to Clipboard!
                    </p>
                    <button
                      className="inline-flex  text-white bg-kpesa-blue hover:bg-blue-800 hover:text-white text-lg rounded-md  px-4 py-1"
                      onClick={() =>
                        navigator.clipboard.writeText(currentURL) &&
                        Toast({
                          message: "Successfully copied to clipboard!",
                        }).success()
                      }
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-full p-6 mb-5 max-sm:mt-5 bg-kpesa-blue border border-gray-200 rounded-lg shadow ">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Goal:&nbsp;
              <p className=" inline-block ">
                {new Intl.NumberFormat("en-EN", {
                  style: "currency",
                  currency: "TZS",
                  // notation: "compact",
                }).format(Number(goal))}
              </p>
            </h5>
            <div class="w-full  rounded-full bg-gray-700">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: calculatePledgePercentage() }}
              ></div>
            </div>
            <p className="w-full text-sm text-white mt-1 ">
              {calculatePledgePercentage()} of goal raised
            </p>
          </a>
          <p class="mb-3 text-sm text-gray-100">
            Please donate to&nbsp; {titleName} &nbsp; today!{" "}
          </p>
          <button
            type="button"
            className=" w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-1"
            onClick={handleChange}
          >
            Invest Today
          </button>
          <button
            type="button"
            data-modal-toggle="popup-modal"
            onClick={openModal}
            className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Share
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-h-full  bg-white overflow-auto">
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
                alt="Campaign Photo"
                height={1000}
                width={1000}
                className=" max-w-full max-h-full  mx-auto rounded-lg  border-4  border-gray-300 shadow-2xl bg-white mb-10"
              />
              <div className="sm:hidden"> {campaignOverview()}</div>
              <div class="block w-full p-6 bg-kpesa-blue border  rounded-lg shadow  mt-4 md:mb-10 max-sm:mb-10">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white uppercase">
                  About&nbsp; {titleName}
                </h5>
                <p class="font-normal text-white ">{description}</p>
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
                  className="max-w-full p-6 mb-5 max-sm:mt-5 bg-kpesa-blue border border-gray-200 "
                >
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
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
