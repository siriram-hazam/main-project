import React, { useState } from "react";
import { GoRepo } from "react-icons/go";
import { FiMenu } from "react-icons/fi";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="flex min-h-screen h-full w-full">
      <div
        id="menu"
        className={`bg-gray-300 w-64 flex flex-col drop-shadow-xl ${
          menuOpen
            ? "block animate__animated animate__fadeInLeft animate__faster"
            : "hidden"
        }`}
      >
        <div className="p-4 border-gray-700 flex">
          <GoRepo className="w-16 h-16 mr-2" />
          <span className="text-3xl font-semibold">Record Of Processing</span>
        </div>
        <nav className="flex-1">
          <p className="ml-5 mb-2 font-medium text-gray-500">Navigate</p>
          <a
            className="ml-7 pl-4 my-1 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>
          <a
            className="ml-7 pl-4 my-1 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>
          <a
            className="ml-7 pl-4 my-1 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>

          <p className="ml-5 mb-2 mt-3 font-medium text-gray-500">
            Team Member
          </p>
        </nav>
      </div>

      <div className="flex-1 flex-nowrap text-nowrap">
        <div className="flex flex-wrap justify-between min-h-12 h-auto bg-gray-300 border-gray-500 drop-shadow-xl content-center max-w-full space-x-4">
          <FiMenu
            color="gray"
            className="w-8 h-8 ml-4 cursor-pointer hover:bg-gray-50 rounded-md drop-shadow-xl "
            onClick={() => setMenuOpen(!menuOpen)}
          />

          <h1 className="text-nowrap border border-gray-300 bg-gray-400 text-gray-200 rounded-3xl content-center px-5 py-1 drop-shadow-xl mr-2">
            บริษัท ทดสอasdasdasdaบ จำกัด
          </h1>
        </div>
        <div className="p-4">Hello, world!</div>
      </div>
    </div>
  );
}
