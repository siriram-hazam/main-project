import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { GoRepo } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import LoginModal from "./LoginModal.jsx";
import ActivitiesPage from "./page-component/activitiesPage.jsx";
import axios from "axios";
axios.defaults.withCredentials = true;

function PageContent({ profile, menuOpen, setMenuOpen }) {
  return (
    <div className="flex min-h-screen max-h-screen max-w-screen">
      <div
        id="menu"
        className={`bg-neutral-200 w-64 flex flex-col drop-shadow-xl ${
          menuOpen
            ? "block animate__animated animate__fadeInLeft animate__faster"
            : "hidden"
        }`}
      >
        <div className="p-2 pr-0 border-gray-700 flex">
          <GoRepo className="w-16 h-16 mr-2" />
          <span className="text-3xl font-semibold">Record Of Processing</span>
        </div>
        <nav className="flex-1">
          <p className="ml-5 mb-2 font-medium text-gray-500">Navigate :</p>
          <Link
            to="/dashboard"
            className="ml-8 pl-4 my-0.5 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
          >
            Dashboard
          </Link>
          <Link
            to="/activities"
            className="ml-8 pl-4 my-0.5 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
          >
            Activities
          </Link>
          <Link
            to="/company"
            className="ml-8 pl-4 my-0.5 w-58 border-l-2 border-gray-100 text-gray-500 hover:border-gray-800 hover:text-gray-800 block"
          >
            Privacy Notice
          </Link>
          <p className="ml-5 mt-3 font-medium text-gray-500">Team Member :</p>
          <div className="bg-neutral-300 mx-8 px-4 py-2 mt-2 w-fit max-w-52 rounded-md flex shadow-md place-items-center">
            <div className="px-3">
              <p className="text-md text-gray-700">{profile.fullname}</p>
              <p className="text-xs text-gray-500">
                {profile.role === "admin" ? "Admin" : "User"}
              </p>
            </div>
          </div>
          <div className="bg-neutral-300 mx-8 px-4 py-2 mt-2 w-fit max-w-52 rounded-md flex shadow-md place-items-center">
            <div className="px-3">
              <p className="text-md text-gray-700">Siriram Hazam</p>
              <p className="text-xs text-gray-500">Full Stack Developer</p>
            </div>
          </div>
        </nav>
        <div className="bg-neutral-300 px-3 py-2 flex place-items-center shadow-md">
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
        <div className="container p-4 mx-auto mb-5 min-w-max">
          <Routes>
            <Route path="/" element={<>No Pages</>}></Route>
            <Route path="/dashboard" element={<>Dashboard Pages</>}></Route>
            <Route path="/activities" element={<ActivitiesPage />}></Route>
          </Routes>
        </div>
        <footer className="text-center text-xs mt-auto">
          &#169;2024 Siriram Hazam, Thanokorn Sittikorn. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false); // New loading state
  const [showLoginModal, setShowLoginModal] = useState(true);

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
      console.log("Please Login!");
    } finally {
      setLoading(true); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  if (!loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    ); // Show a loading message while fetching data
  }

  return (
    <BrowserRouter>
      <PageContent
        profile={profile}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <LoginModal show={showLoginModal} onClose={toggleLoginModal} />
    </BrowserRouter>
  );
}
