import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { useAuth } from "../hooks/useAuth";
import Channels from "../components/Channels";
import useInput from "../hooks/useinput";
import Router from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const methods = useForm({ mode: "onBlur" });
  const { signInWithGoogle, signIn } = useAuth();

  const {
    register,
    formState: { errors },
  } = methods;

  const email = useInput("");
  const password = useInput("");

  const login = async (event) => {
    event.preventDefault();
    try {
      await signIn(email.value, password.value);
      Router.push("/channel/ZHLL1uu44KdB3v9iaxXN");
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        toast.error(
          "Error, either the email or password or both do not exist",
          {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else if ((error.code = "auth/too-many-requests")) {
        toast.error(
          "Too many requests have been submitted. You now must reset your password to re-enable your account.",
          {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
      console.log("error", error);
    }
  };

  return (
    <div class="overflow-y-auto">
      <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex justify-end">
          <div className="bg-white min-h-screen w-full sm:w-1/2 flex justify-center items-center">
            <div>
              <div>
                <h5 className="text-sm text-gray-900">Welcome back</h5>
                <h2 className="text-2xl font-bold">Login to your account</h2>
              </div>
              <FormProvider {...methods}>
                <form action="" className="w-full mt-5 pb-12" onSubmit={login}>
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="block text-md mb-2">
                        Email
                      </label>
                    </div>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
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
                      <p className="text-red-400">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex justify-between mt-3">
                    <div>
                      <input
                        className="cursor-pointer mr-1"
                        type="radio"
                        name="rememberme"
                      />
                      <span className="text-sm">Remember Me</span>
                    </div>
                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className={
                        "mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
                      }
                    >
                      <p className="capitalize text-white font-normal">
                        Login Now
                      </p>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={signInWithGoogle}
                      className="flex  space-x-2 justify-center items-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100 w-full"
                    >
                      <BsGoogle />
                      <span>Or sign-in with google</span>
                    </button>
                  </div>
                </form>
              </FormProvider>
              <p className="flex item-center justify-center">
                Dont have an account?
                <span className="cursor-pointer text-blue-600 ml-1">
                  <Link href="/signup">Join free today</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
