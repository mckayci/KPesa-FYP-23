import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { useAuth } from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import Toast from "../Toast";
import Header from "../../components/Hamburger";
import LoginDetails from "../signup/LoginDetails";
import { useState } from "react";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState("");
  const router = useRouter();
  const methods = useForm({ mode: "onBlur" });
  const { signInWithGoogle, signIn } = useAuth();

  const {
    register,
    formState: { errors },
  } = methods;

  const login = async (event) => {
    event.preventDefault();
    if (loginDetails.email && loginDetails.password) {
      try {
        await signIn(loginDetails.email, loginDetails.password);
        router.replace("/channel/ZHLL1uu44KdB3v9iaxXN");
      } catch (error) {
        if (error.code == "auth/wrong-password") {
          Toast({
            message: "Wrong password or email has been provided please retry",
          }).warning();
        } else if ((error.code = "auth/too-many-requests")) {
          Toast({
            message:
              "Too many requests have been made, you must reset your password",
          }).error();
        }
      }
    }
  };

  const handleThirdPartySignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  return (
    <div class="overflow-y-auto h-screen w-full relative">
      <Header />
      <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex justify-end">
          <div className="bg-white min-h-screen w-full sm:w-1/2 flex justify-center items-center">
            <div>
              <div>
                <h5 className="text-sm text-gray-900">Welcome back</h5>
                <h2 className="text-2xl font-bold">Login to your account</h2>
              </div>
              <FormProvider {...methods}>
                <form action="" className="w-full mt-5 pb-12">
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
                      onChange={handleChange}
                      value={loginDetails["email"] || ""}
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
                      onChange={handleChange}
                      value={loginDetails["password"] || ""}
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
                      onClick={login}
                      className={
                        "mt-4 mb-3 w-full bg-kpesa-blue hover:bg-kpesa-alt-blue text-white py-2 rounded-md transition duration-100"
                      }
                    >
                      <p className="capitalize text-white font-normal">
                        Login Now
                      </p>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={(event) => handleThirdPartySignIn(event)}
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
                  <Link href="/subscribe">Join for free today</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
