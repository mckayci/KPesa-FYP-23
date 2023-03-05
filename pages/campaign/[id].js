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
import { useAuth } from "../../hooks/useAuth";
import Image from "next/image";
import Header from "../../components/Hamburger";
import UserCampaign from "../../components/investment/Campaign[id]";
import Footer from "../../components/Footer";

function CampaignViewer() {
  return <UserCampaign />;
}

export default CampaignViewer;
