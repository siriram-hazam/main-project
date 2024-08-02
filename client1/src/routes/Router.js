import React, { useEffect, useState } from "react";

//Components
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";

const Themeroutes = [
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {/* <Dashboard /> */}
        <>Hello Dashboard</>
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
