import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../components/login/Login";

export default function HomePage() {
  const { user, signInWithGoogle, signOut, db } = useAuth();

  console.log("user", user);

  return (
    <div className="h-screen">
      <Login />
    </div>
  );
}
