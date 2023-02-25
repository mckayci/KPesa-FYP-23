import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/KPesa_logo-300x300.png";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../hooks/useAuth";
import { userAgent } from "next/server";
import { useRouter } from "next/router";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const menuItems = [
    {
      id: 2,
      name: "Login",
      link: "/login",
    },
    {
      id: 3,
      name: "Sign Up",
      link: "/signup",
    },
  ];

  const handleLogout = async () => {
    await router.push("/login");
    try {
      signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const pushLogin = async () => {
    await router.push("/login");
  };

  return (
    <div className="w-full sticky top-0">
      <nav className="border-gray-200 rounded-b bg-gray-50 py-6 px-3 dark:bg-gray-800 dark:border-gray-700">
        <div class="container  justify-between mx-auto">
          <Link href="">
            <span class="self-center text-xl inline-block font-semibold whitespace-nowrap dark:text-white">
              KPesa
            </span>
          </Link>

          <div className="flex items-center float-right">
            <div className="mr-5 text-white hover:underline">
              {user ? (
                <button onClick={handleLogout}>Sign Out</button>
              ) : (
                <button onClick={pushLogin}>Sign In</button>
              )}
            </div>
            <Link href={user ? "/profile" : "/login"}>
              <CgProfile className="h-xl mr-5 text-3xl ext-gray-white rounded-lg focus:outline-none focus:ring-3 focus:ring-gray-200  text-white hover:bg-gray-700 dark:focus:ring-gray-60" />
            </Link>
            <div
              id="hamburger"
              className=" p-2 my-auto text-sm  rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-200 text-white hover:bg-gray-700 dark:focus:ring-gray-60"
            >
              <div
                className="HAMBURGER-ICON space-y-2 "
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
              </div>
            </div>
          </div>
        </div>

        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="absolute top-0 right-0 px-8 py-8 z-10"
            onClick={() => setIsNavOpen(false)}
          ></div>
          <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 z-10">
            <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <Link href={"https://kpesa.com/"}>Home</Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <Link href="/campaignView">Campaigns</Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <Link href="/">Forum</Link>
            </li>
          </ul>
        </div>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: relative;
        width: 100%;
        top: 0;
        left: 0;
        background: inherit;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
    `}</style>
    </div>
  );
}