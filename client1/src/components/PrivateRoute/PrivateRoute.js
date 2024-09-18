import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

//Hooks
import authUtils from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authUtils.checkAuthStatus();
        // console.log(res);
        if (res.data.status === "authenticated") {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
        console.error("Error PrivateRoute checkAuth : ", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
