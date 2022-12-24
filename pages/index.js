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
import Channels from "../components/Channels";

export default function HomePage() {
  const { user, signInWithGoogle, signOut, db } = useAuth();

  console.log("user", user);

  return (
    <div className="h-full">
      <Head>
        <title>Ciaran&apos;s app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <button onClick={user ? signOut : signInWithGoogle}>
          {user ? "Sign Out" : "Sign In"}
        </button>
        <Channels db={db} />
      </div>
    </div>
  );
}
