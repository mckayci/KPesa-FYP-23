import React, { useState } from "react";
import { useEffect } from "react";
import classNames from "classnames";
import {
  collection,
  query,
  limit,
  orderBy,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import Head from "next/head";
import Footer from "../components/Footer";
import Link from "next/link";

import CampaignList from "../components/campaigns/CampaignList";
import Header from "../components/Hamburger";

function CampaignView() {
  const { db, user } = useAuth();

  return (
    <div className="h-full w-full relative overflow-y-scroll">
      <Header />
      <div className="flex flex-row mt-10 max-md:flex-col flex-overflow justify-between  w-full max-w-screen-lg px-4 lg:px-6 mx-auto">
        <div className="text-4xl font-semibold  max-md:mx-auto max-md:text-center max-md:mt-10 text-gray-900">
          Check Out Our Latest Campaigns!
        </div>
        <Link
          href={"/campaignSetUp"}
          type="button"
          class="text-white bg-kpesa-blue hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  max-md:mt-5 font-medium rounded-full max-md:w-3/4 max-md:mx-auto text-sm px-5 py-2.5 text-center  mb-2"
        >
          Create your own Campaign!
        </Link>
      </div>
      <CampaignList db={db} />
      <Footer className="mt-10" />
    </div>
  );
}
export default CampaignView;
