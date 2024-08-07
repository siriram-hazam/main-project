import React, { useEffect, useState } from "react";

//Components
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";

//Layouts
import FullLayout from "../layouts/FullLayout/FullLayout.js";
//End Layouts

const Themeroutes = [
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {/* <Dashboard /> */}
        {/* <>Hello Dashboard</> */}
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
      },
    ],
  },
];

export default Themeroutes;
