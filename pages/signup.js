import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import useInput from "../hooks/useinput";
import "firebase/firestore";
import "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Header from "../components/Hamburger";

const SignupPage = () => {
  const router = useRouter();
  const methods = useForm({ mode: "onBlur" });
  const { signUp, user } = useAuth();

  const {
    register,
    formState: { errors },
  } = methods;

  const email = useInput("");
  const password = useInput("");
  const password_confirm = useInput("");
  const userType = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.value == password_confirm.value) {
      try {
        await signUp(
          email.value,
          password.value,
          userType.value,
          firstName,
          lastName
        );
        router.push("/channel/ZHLL1uu44KdB3v9iaxXN");
      } catch (error) {
        console.log("error", error);
      }
    } else {
      toast.error("Passwords do not match", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="overflow-y-auto h-screen w-full relative">
      <Header />
      <div className=" bg-no-repeat bg-cover bg-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex-justify-end">
          <div className="bg-white  w-full sm:w-1/2 flex justify-center items-center">
            <div className="mt-5">
              <div>
                <div>
                  <h2 className="text-sm text-kpesa-alt-blue">
                    Join our Movement
                  </h2>
                  <h1 className="text-2xl font-bold text-kpesa-blue">
                    {" "}
                    Sign up for free{" "}
                  </h1>
                </div>
                <FormProvider {...methods}>
                  <form
                    action=""
                    className="w-full mt-5 pb-12"
                    onSubmit={handleSubmit}
                  >
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="" className="block text-md mb-2">
                          Email
                        </label>
                      </div>

                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                        placeholder="email"
                        {...email}
                      />
                      {errors.email && (
                        <p className="text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="" className="block text-md mb-2">
                          Password
                        </label>
                      </div>

                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                        placeholder="password"
                        {...password}
                      />
                      {errors.password && (
                        <p className="text-red-400">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-8">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor=""
                          className="block mb-3 font-sans text-black-900"
                        >
                          Confirm Password
                        </label>
                      </div>
                      <input
                        type="password"
                        {...register("password_confirm", {
                          required: "Verify your password",
                        })}
                        className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                        placeholder="Same password again"
                        {...password_confirm}
                      />
                      {errors.password_confirm && (
                        <p className="text-red-400">
                          {errors.password_confirm.message}
                        </p>
                      )}
                    </div>

                    {/*Personal Details */}

                    <div className="mt-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-kpesa-blue">
                          Now for Some Personal Details
                        </h3>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <label
                          for="userType"
                          className="block mb-3 font-sans text-black-900"
                        >
                          Are you an...?
                        </label>
                      </div>
                      <select
                        id="userType"
                        className="border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center"
                        {...userType}
                      >
                        <option>Investor</option>
                        <option>Entrepreneur</option>
                      </select>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="" className="block text-md mb-2">
                          First Name
                        </label>
                      </div>

                      <input
                        type="text"
                        className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                        placeholder="First Name"
                        {...firstName}
                      />
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="" className="block text-md mb-2">
                          Last Name
                        </label>
                      </div>

                      <input
                        type="text"
                        className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                        placeholder="Last Name"
                        {...lastName}
                      />
                    </div>

                    <div className="flex justify-center pt-8">
                      <button
                        type="submit"
                        className={
                          "mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
                        }
                      >
                        <p className="capitalize text-white font-normal">
                          Join KPesa Now!
                        </p>
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
