import React, { useState } from "react";

//Hooks
import authUtils from "../../hooks/useAuth";

import TextScramble from "../../components/TextScramble/TextScramble";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authUtils.authLogin(username, password);
      // console.log("response", response);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          window.location = "/dashboards";
        }, 2000); // หน่วงเวลา 2 วินาที
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error Login handleSubmit : ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left cream-colored section */}
        <div className="hidden md:flex md:w-1/2 bg-[#FFF8E7] dark:bg-gray-800 items-center justify-center">
          {/* Center content container */}
          <div className="text-3xl font-semibold text-gray-800 text-center px-8">
            <a className="flex items-center justify-center mb-6 text-5xl font-semibold text-gray-900 dark:text-white">
              {/* <TextScramble
                text="Welcome to Record of Processing"
                duration={70}
              /> */}
              Welcome to <br />
              Record of Processing <br />
              WebAPP
            </a>
          </div>
        </div>

        <section className="bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 animate-gradient-x w-screen h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  // action="#"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      // for="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="username"
                      // name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="abcdefg...."
                      required=""
                      onChange={(e) => setUsename(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 animate-gradient-x hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 transform hover:scale-105"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
