import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../components/login/login";

export default function HomePage() {
  const { user, signInWithGoogle, signOut, db } = useAuth();

  console.log("user", user);

  return (
    <div className="h-screen">
      <Login />
      {/* <Channels
          className="flex flex-col w-full py-4 px-3 rounded dark:bg-gray-800 sticky text-4xl"
          db={db}
        /> */}
    </div>
  );
}
