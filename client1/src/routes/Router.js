import React from "react";
import { Navigate } from "react-router-dom";

// Components
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";

// Layouts
import FullLayout from "../layouts/FullLayout/FullLayout.js";

// Dashboard
import Dashboard1 from "../views/dashboard/Dashboard1.js";

//Activities Table
import ActivitiesTable from "../views/tables/Activities/ActivitiesTable.js";
//Privacy Notice Table
import PrivacyNoticeTable from "../views/tables/PrivacyNotice/PrivacyNoticeTable.js";

// Define routes
const Themeroutes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="dashboards" /> },
      { path: "dashboards", exact: true, element: <Dashboard1 /> },
      {
        path: "activities",
        element: <ActivitiesTable />,
      },
      {
        path: "privacy-notice",
        element: <PrivacyNoticeTable />,
      },
    ],
  },
];

export default Themeroutes;
