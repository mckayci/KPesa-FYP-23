import React, { createContext, useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export const UserDataContext = createContext(null);

const userDataContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const userDataRef = doc(db, "userData", user.uid);
      await getDoc(userDataRef).then((doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        }
      });
    };

    fetchData();
  }, []);

  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
};
