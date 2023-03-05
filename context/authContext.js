import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import { app } from "../hooks/useAuth";

const authContext = createContext({});
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState((email = null), (uid = null));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(app, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(app, email, password);
  };

  const logOut = async () => {
    setUser((email = null), (uid = null));
    await signOut(app);
  };

  return (
    <authContext.Provider value={{ user, logIn, logOut }}>
      {loading ? null : children}
    </authContext.Provider>
  );
}
