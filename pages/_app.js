import { ProvideAuth } from "../hooks/useAuth";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <ToastContainer />
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default MyApp;
