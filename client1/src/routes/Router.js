import React from "react";
import { Navigate } from "react-router-dom";

// Components
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.js";

// Layouts
import FullLayout from "../layouts/FullLayout/FullLayout.js";

// Dashboard
import Dashboard1 from "../views/dashboard/Dashboard1.js";

// Edit Profile
import EditProfile from "../views/editProfile/editProfile.js";

//Activities Add
import ActivitiesAdd from "../views/activities/Activities.js";

//Activities Table
import ActivitiesTable from "../views/tables/Activities/ActivitiesTable.js";
//Privacy Notice Table
// import PrivacyNoticeTable from "../views/tables/PrivacyNotice/PrivacyNoticeTable.js";
//Add More User (Admin) Profile Table
import AddMoreUserAdmin from "../views/tables/AddMoreUserAdmin/AddMoreUserAdmin.js";
// Company List Super
import CompanyListSuper from "../views/tables/CompanyListSuper/CompanyListSuper.js";
// Company User Super
import CompanyUserSuper from "../views/tables/CompanyUserSuper/CompanyUserSuper.js";
// Form
// import Form from "../views/form/Form.js";

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
        path: "activities/add",
        element: <ActivitiesAdd />,
      },
      // {
      //   path: "form",
      //   element: <Form />,
      // },
      // {
      //   path: "privacy-notice",
      //   element: <PrivacyNoticeTable />,
      // },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "user-admin",
        element: (
          <PrivateRoute requiredRole="admin">
            <AddMoreUserAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "company-list-super",
        element: (
          <PrivateRoute requiredRole="superadmin">
            <CompanyListSuper />
          </PrivateRoute>
        ),
      },
      {
        path: "company-user-super",
        element: (
          <PrivateRoute requiredRole="superadmin">
            <CompanyUserSuper />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default Themeroutes;
