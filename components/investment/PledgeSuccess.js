import logo from "../../public/images/kpesa-logo-300x300.png";
import Image from "next/image";
import { useRouter } from "next/router";

function PledgeSuccess({ userData, setUserData, handleClick }) {
  const route = useRouter();

  const handleSubmit = () => {
    route.replace("/campaign/view");
  };

  const { campaignName, pledgeAmount } = userData;
  return (
    <div className="md:flex md:items-center md:justify-center h-screen">
      <div className="w-1/3 mx-auto bg-kpesa-blue bg-opacity-80 text-white shadow-lg z-10 rounded-3xl">
        <div className="my-5 mx-auto">
          <Image
            src={logo}
            alt="logo"
            className=" h-24 w-24  p-2 rounded-full bg-white border-kpesa-alt-blue border-2 mx-auto mt-20"
          />
        </div>
        <div className="mx-auto text-center">
          <div className="text-5xl mx-auto mt-10 text-center">Success!</div>
          <div className="text-xl mt-5">
            Thank you for pledging to donate to {campaignName}{" "}
            <div className="text-2xl uppercase mt-10">
              Amount Donated:&nbsp;{" "}
              {new Intl.NumberFormat("en-EN", {
                style: "currency",
                currency: "TZS",
              }).format(Number(pledgeAmount))}
            </div>
            <button
              className="rounded-3xl mt-10 bg-kpesa-alt-blue p-3 mb-20"
              onClick={handleSubmit}
            >
              Return to Campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PledgeSuccess;
