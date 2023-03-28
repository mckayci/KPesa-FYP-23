import { useStepperContext } from "../../context/StepperContext.js";
import Image from "next/image.js";
import logo from "../../public/images/kpesa-logo-300x300.png";
import { useForm } from "react-hook-form";

function LoginDetails({ userData, setUserData }) {
  const methods = useForm({ mode: "onBlur" });

  const {
    register,
    formState: { errors },
  } = methods;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="relatvie">
      <Image src={logo} alt="KPesa logo" className="relative ml-2 h-24 w-24" />
      <div className="flex flex-col">
        <div className="mx-2 w-full flex-1">
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
              onChange={Change}
              value={userData["email"] || ""}
              name="email"
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
              value={userData["password"] || ""}
              name="password"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-black-900">
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
            />
            {errors.password_confirm && (
              <p className="text-red-400">{errors.password_confirm.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginDetails;
