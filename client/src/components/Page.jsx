import React from "react";
import { GoRepo } from "react-icons/go";

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-30">
      <div className="bg-gray-300 w-64 rounded-r-xl flex flex-col border-r-4 border-gray-500 drop-shadow-xl">
        <div className="p-4 border-gray-700 flex animate__animated animate__bounce">
          <GoRepo className="w-16 h-16 mr-2" />
          <span className="text-3xl font-semibold">Record Of Processing</span>
        </div>
        <nav className="flex-1 ">
          <p className="ml-4 mb-2 font-medium text-gray-500">Navigate</p>
          <a
            className="ml-5 pl-4 my-1 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>
          <a
            className="ml-5 pl-4 my-1 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>
          <a
            className="ml-5 pl-4 my-1 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>
          <a
            className="ml-5 pl-4 my-1 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>

          <p className="ml-4 mb-2 mt-3 font-medium text-gray-500">
            Team Member
          </p>
        </nav>
      </div>
      <div className="flex-1 p-4">Hello, world!</div>
    </div>
  );
}
