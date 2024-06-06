import React, { useState, useEffect } from "react";
import { GoRepo } from "react-icons/go";
import { FiMenu } from "react-icons/fi";

import LoginModal from "./LoginModal.jsx";
import InfoActivityModal from "./InfoActivityModal.jsx";
import EditActivityModal from "./EditActivityModal.jsx";
import CreateActivityModal from "./CreateActivityModal.jsx";

import axios from "axios";
axios.defaults.withCredentials = true;

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/user/userProfile");
      setProfile(res.data.users);
      console.log(res.data.users);

      if (res.data.status === 200) {
        setShowLoginModal(false);
        console.log("Profile Found");
      } else {
        console.log("Profile Not Found");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const [showLoginModal, setShowLoginModal] = useState(true);
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  const [showInfoActivityModal, setShowInfoActivityModal] = useState(false);
  const toggleInfoActivityModal = () => {
    setShowInfoActivityModal(!showInfoActivityModal);
  };
  const [showCreateactivityModal, setShowCreateactivityModal] = useState(false);
  const toggleCreateactivityModal = () => {
    setShowCreateactivityModal(!showCreateactivityModal);
  };
  const [showEditactivityModal, setShowEditactivityModal] = useState(false);
  const toggleEditactivityModal = () => {
    setShowEditactivityModal(!showEditactivityModal);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

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
            Dashboard
          </a>
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
            Privacy Notice
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
            <p className="text-sm text-gray-700">{profile.fullname}</p>
            <p className="text-xs text-gray-500">
              {profile.role === "admin" ? "Admin" : "User"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex-nowrap text-nowrap">
        <div className="flex justify-between min-h-12 bg-neutral-200 border-gray-500 drop-shadow place-items-center max-w-full space-x-4 pr-4">
          <FiMenu
            color="gray"
            className="w-8 h-8 ml-4 cursor-pointer hover:bg-gray-50 rounded-md drop-shadow-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <h1 className="text-nowrap bg-neutral-300 text-gray-500 rounded-2xl content-center px-4 py-1 drop-shadow">
            {profile.company_relation?.companyName || "Company Name"}
          </h1>
        </div>

        {/* Login Modal */}
        <LoginModal show={showLoginModal} onClose={toggleLoginModal} />

        {/* Modal Info Activities */}
        <InfoActivityModal
          show={showInfoActivityModal}
          onClose={toggleInfoActivityModal}
        />

        {/* Modal Create Activities */}
        <CreateActivityModal
          show={showCreateactivityModal}
          onClose={toggleCreateactivityModal}
        />

        {/* Modal Edit Activities */}
        <EditActivityModal
          show={showEditactivityModal}
          onClose={toggleEditactivityModal}
        />

        <div className="container p-4 mx-auto mb-5 min-w-max">
          <div className="flex mb-5">
            <div className="ml-auto space-x-2 flex-nowrap text-sm">
              <button
                className="bg-neutral-300 p-2 rounded-3xl px-3 text-gray-700"
                onClick={() =>
                  setShowCreateactivityModal(!showCreateactivityModal)
                }
              >
                Add Activities
              </button>
              <button className="bg-neutral-300 p-2 rounded-3xl px-3 text-gray-700">
                Delete Activities
              </button>
            </div>
          </div>

          <div className="table w-full text-sm">
            <div className="table-header-group bg-neutral-200 font-semibold text-neutral-800">
              <div className="table-row">
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
                  กิจกรรมงานที่บันทึก
                </div>
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
                  แผนก
                </div>
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
                  สถานะการตรวจสอบ
                </div>
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
                  เวลาที่บันทึก
                </div>
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300">
                  ผู้บันทึก
                </div>
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300"></div>
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300"></div>
                <div className="table-cell py-1 px-2 border-b-2 border-neutral-300"></div>
              </div>
            </div>
            <div className="table-row-group hover:bg-gray-100 cursor-pointer text-neutral-600">
              <div className="table-row">
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  ข้อมูลกิจกรรม 1
                </div>
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  ข้อมูลแผนก 1
                </div>
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  ข้อมูลสถานะ 1
                </div>
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  ข้อมูลเวลา 1
                </div>
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  ข้อมูลผู้บันทึก 1
                </div>
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  <button
                    className="text-neutral-500 hover:text-black"
                    onClick={toggleInfoActivityModal}
                  >
                    ดู
                  </button>
                </div>
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  <button
                    className="text-neutral-500 hover:text-black"
                    onClick={toggleEditactivityModal}
                  >
                    แก้ไข
                  </button>
                </div>
                <div className="table-cell py-2 px-2 border-b-2 border-neutral-300">
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="text-center text-xs mt-auto">
          &#169;2024 Siriram Hazam, Thanokorn Sittikorn. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
