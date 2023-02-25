import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FirebaseError, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import Channels from "/components/Channels";

export default function HomePage() {
  const { user, signInWithGoogle, signOut, db } = useAuth();

  console.log("user", user);

  return (
    <div className="text-4xl h-screen">
      <Channels
        className="flex flex-col w-full py-4 px-3 rounded dark:bg-gray-800 sticky text-4xl"
        db={db}
      />
    </div>
  );
}
