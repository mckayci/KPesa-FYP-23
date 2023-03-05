import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./Toast";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { db } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    console.log("user", user);
    if (!user) {
      router.push("/user/login");
      Toast({
        message: "Please login before accessing member only features",
      }).notify();
    } else {
      // Check user type before allowing access to routes
      const userDataRef = doc(db, "userData", user.uid);
      getDoc(userDataRef)
        .then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            if (userData.userType === "Investor") {
              router.push("/campaign/view");
              Toast({
                message: "The forum is for entrepreneurs only!",
              }).warning();
            }
          } else {
            console.log("User data not found");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router, user, db]);

  // Render the children only if the user object is available
  return user ? <div>{children}</div> : null;
};

export default ProtectedRoute;
