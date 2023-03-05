import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "./Hamburger";

const Navbar = ({ children }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();

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
    await router.push("/user/login");
    try {
      signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="flex flex-wrap container mx-auto max-w-full items-center p-2 justify-between bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center text-blue-900 hover:text-kpesa-blue cursor-pointer transition duration-150 ">
          <Link href={"https://kpesa.com/"}>
            <Image
              className="max-md:hidden .h-auto max-h-50 max-w-50"
              src="public/images/kpesa-logo-300x300.png"
              alt="KPesa Logo"
              height="50"
              width="50"
            />
          </Link>
        </div>
        <nav
          className={`md:flex md:items-center font-title sm:w-full md:w-auto`}
        >
          <ul className="text-lg inline-block md:inline max-sm:items-end">
            <>
              {!user ? (
                menuItems.map((item) => (
                  <li
                    key={item.id}
                    className="my-3 md:my-0 items-center mr-4 inline-block  "
                  >
                    <Link
                      href={item?.link}
                      className="text-kpesa-blue hover:text-blue-900 transition"
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li className="my-3 md:my-0 items-center mr-4 inline-block">
                    <a
                      onClick={handleLogout}
                      className="text-kpesa-blue hover:text-blue-900 transition cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
              <li className="my-3 md:my-0 items-center mr-4 inline-block">
                <Header />
              </li>
            </>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
};

export default Navbar;
