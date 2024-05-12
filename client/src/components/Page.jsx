import React, { useState } from "react";
import { GoRepo } from "react-icons/go";
import { FiMenu } from "react-icons/fi";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(true);

  // JavaScript
  document.querySelectorAll('[data-toggle="modal"]').forEach((item) => {
    item.addEventListener("click", (event) => {
      document
        .querySelector(item.getAttribute("data-target"))
        .classList.remove("hidden");
    });
  });

  document.querySelectorAll(".close").forEach((item) => {
    item.addEventListener("click", (event) => {
      document.querySelector(".modal").classList.add("hidden");
    });
  });

  return (
    <div className="flex min-h-screen min-w-max flex-nowrap">
      <div
        id="menu"
        className={`bg-neutral-200 w-64 flex flex-col drop-shadow-xl ${
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
          <p className="ml-5 mb-2 font-medium text-gray-500">Navigate :</p>
          <a
            className="ml-8 pl-4 my-0.5 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            Activities
          </a>
          <a
            className="ml-8 pl-4 my-0.5 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>
          <a
            className="ml-8 pl-4 my-0.5 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
            href="#"
          >
            asd
          </a>
          <p className="ml-5 mt-3 font-medium text-gray-500">Team Member :</p>
          <div className="bg-neutral-300 mx-8 px-2 py-2 mt-2 w-fit max-w-52 rounded-md flex shadow-md place-items-center ">
            <img
              className="w-10 h-10 rounded-full"
              src={require("../img/Siriram1.jpg")}
              alt=""
            />
            <div className="px-3">
              <p className="text-md text-gray-700">Siriram Hazam</p>
              <p className="text-xs text-gray-500">Full Stack Developer</p>
            </div>
          </div>
        </nav>

        <div className="bg-neutral-300 px-3 py-2 flex place-items-center shadow-md">
          <img
            className="w-11 h-11 rounded-full"
            src={require("../img/Siriram1.jpg")}
            alt=""
          />
          <div className="px-3">
            <p className="text-sm text-gray-700">Siriram Hazam</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex-nowrap text-nowrap ">
        <div className="flex justify-between min-h-12 h-auto bg-neutral-200 border-gray-500 drop-shadow place-items-center max-w-full space-x-4 pr-4">
          <FiMenu
            color="gray"
            className="w-8 h-8 ml-4 cursor-pointer hover:bg-gray-50 rounded-md drop-shadow-xl "
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <h1 className="text-nowrap bg-neutral-300 text-gray-500 rounded-2xl content-center px-4 py-1 drop-shadow ">
            Hello World Company Ltd
          </h1>
        </div>

        <div className="container p-4 mx-auto mb-5 min-w-max">
          <div className="flex mb-5">
            <div className="ml-auto space-x-2 flex-nowrap text-sm">
              <button className="bg-neutral-300 p-2 rounded-3xl px-3 text-gray-700">
                Add Activities
              </button>
              <button className="bg-neutral-300 p-2 rounded-3xl px-3 text-gray-700">
                Delete Activities
              </button>
            </div>
          </div>

          {/* <div class="w-full min-w-max bg-neutral-300 rounded-md px-3 py-2 flex justify-between place-items-center text-xs font-bold">
            <p class="w-1/4">กิจกรรมงานที่บันทึก</p>
            <p class="w-1/4">แผนก</p>
            <p class="w-1/4">สถานะการตรวจสอบ</p>
            <p class="w-1/4"></p>
          </div>

          <div class="w-full min-w-max bg-white rounded-md px-3 py-2 flex justify-between place-items-center text-sm">
            <p class="w-1/4">ข้อมูลกิจกรรม</p>
            <p class="w-1/4">ข้อมูลแผนก</p>
            <p class="w-1/4">ข้อมูลสถานะ</p>
            <button class="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ปุ่ม
            </button>
          </div> */}

          {/* <!-- HTML --> */}
          <table class="w-full min-w-max bg-neutral-300 rounded-md text-xs">
            <thead>
              <tr class="font-bold">
                <th class="px-3 py-2">กิจกรรมงานที่บันทึก</th>
                <th class="px-3 py-2">แผนก</th>
                <th class="px-3 py-2">สถานะการตรวจสอบ</th>
                <th class="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white hover:bg-gray-100 cursor-pointer"
                data-toggle="modal"
                data-target="#myModal"
              >
                <td class="px-3 py-2">ข้อมูลกิจกรรม 1</td>
                <td class="px-3 py-2">ข้อมูลแผนก 1</td>
                <td class="px-3 py-2">ข้อมูลสถานะ 1</td>
                <td class="px-3 py-2">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    ปุ่ม
                  </button>
                </td>
              </tr>
              <tr
                class="bg-white hover:bg-gray-100 cursor-pointer"
                data-toggle="modal"
                data-target="#myModal"
              >
                <td class="px-3 py-2">ข้อมูลกิจกรรม 2</td>
                <td class="px-3 py-2">ข้อมูลแผนก 2</td>
                <td class="px-3 py-2">ข้อมูลสถานะ 2</td>
                <td class="px-3 py-2">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    ปุ่ม
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* <!-- Modal --> */}
          <div
            id="myModal"
            class="modal hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div class="modal-content bg-white rounded-md p-8">
              <span class="close absolute top-0 right-0 m-4 text-2xl cursor-pointer">
                &times;
              </span>
              <p>ข้อมูลที่ต้องการแสดง</p>
            </div>
          </div>
        </div>

        <footer></footer>
      </div>
    </div>
  );
}
