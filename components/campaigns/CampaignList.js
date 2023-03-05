import React, { useMemo, useState } from "react";
import Campaign from "./Campaign";
import { useEffect } from "react";
import classNames from "classnames";
import {
  collection,
  query,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

function CampaignList() {
  const { db } = useAuth();

  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      return (
        !search ||
        campaign.campaignName.toLowerCase().includes(search.toLowerCase()) ||
        campaign.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [campaigns, search]);

  const fetchCampaigns = () => {
    const campaignRef = collection(db, "campaign");
    const q = query(campaignRef, orderBy("campaignName"));
    const handleSnapshot = (QuerySnapshot) => {
      const data = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const docId = QuerySnapshot.docs.map((doc) => ({
        id: doc.id,
      }));
      console.log("docId", data);
      setCampaigns(data);
    };

    //load initial docs
    getDocs(q).then(handleSnapshot);
    //Respond to new docs
    onSnapshot(q, handleSnapshot);
  };

  useEffect(() => {
    fetchCampaigns();
  }, [db]);

  const searchCampaignList = (e) => {
    e.preventDefault();
    setCampaigns(
      campaigns.filter((campaign) => {
        return (
          campaign.campaignName.toLowerCase().includes(search.toLowerCase()) ||
          campaign.description.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  return (
    <div className=" bg-white h-full">
      <form
        className="flex max-sm:flex-col my-5  justify-center   mx-auto max-sm:flex-overflow max-sm:justify-between "
        onSubmit={(e) => {
          searchCampaignList(e);
        }}
      >
        <input
          className=" border-kpesa-blue rounded-3xl border-2 md:w-1/2 px-2  max-sm:mx-auto max-sm:w-3/4"
          placeholder="Search a Campaign"
          type="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="flex my-2 max-sm:justify-center">
          <button
            type="submit"
            className="text-white bg-kpesa-blue hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py- text-center mx-2 mb-2"
          >
            Search
          </button>
          <button
            onClick={fetchCampaigns}
            className="text-white bg-kpesa-alt-blue hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mx-2 mb-2"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="flex p-4 mx-auto sm:flex-wrap flex-row max-sm:w-full max-sm:flex-col justify-center">
        {filteredCampaigns.map((campaign) => (
          <Campaign
            campaign={campaign}
            key={campaign.id}
            className="space-y-2 flex-auto  px-12"
          />
        ))}
      </div>
    </div>
  );
}
export default CampaignList;
