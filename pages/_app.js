import { ProvideAuth } from "../hooks/useAuth";
import "../styles/globals.css";
import Navbar from "/components/Navbar";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      {/*
      <div className="flex flex-col max-h-screen h-screen overflow-hidden">
        <Navbar>
        </Navbar>
      </div> */}
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default MyApp;
