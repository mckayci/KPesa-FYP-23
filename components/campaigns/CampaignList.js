import React, { useState } from "react";
import Campaign from "../campaigns/Campaign";
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

  useEffect(() => {
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
  }, [db]);

  return (
    <div className=" bg-white h-full">
      <div className="flex   p-4 mx-auto sm:flex-wrap flex-row max-sm:w-full max-sm:flex-col justify-center">
        {campaigns.map((campaign) => (
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
