import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import "firebase/firestore";
import * as firebase from "firebase/app";
import { useRouter } from "next/router";
import { setDoc, doc } from "firebase/firestore";
import { AuthContextProvider } from "../context/authContext";

// initialization{
export const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
});

const authorisation = getAuth(app);
const db = getFirestore(app);

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState(() => authorisation.currentUser);

  useEffect(() => {
    authorisation.onAuthStateChanged((nextUser) => {
      console.log(nextUser);
      if (nextUser) {
        setUser(nextUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    authorisation.useDeviceLanguage();

    try {
      await signInWithPopup(authorisation, provider);
      router.push("/channel/ZHLL1uu44KdB3v9iaxXN");
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (email, password, userType, firstName, lastName) => {
    try {
      const response = await createUserWithEmailAndPassword(
        authorisation,
        email,
        password
      );
      const user = response.user;
      await sendEmailVerification(user);
      setUser(user);
      await setDoc(doc(db, "userData", user.uid), {
        userType: userType,
        firstName: firstName,
        lastName: lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    const response = await signInWithEmailAndPassword(
      authorisation,
      email,
      password
    );
    setUser(response.user);
    return response.user;
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(authorisation);
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    user,
    signUp,
    signInWithGoogle,
    signIn,
    signOut,
    db,
  };
}
