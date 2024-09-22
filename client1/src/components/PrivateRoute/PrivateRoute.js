import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authUtils from "../../hooks/useAuth";

const PrivateRoute = ({ children, requiredRole, status_route }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authUtils.checkAuthStatus();
        // console.log("PrivateRoute checkAuth : ", res.data.user.role);
        // console.log(users);
        if (res.data.status === "authenticated") {
          setAuth(true);
          setUserRole(res.data.user.role); // เก็บข้อมูลยศ
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

  // ตรวจสอบยศของผู้ใช้
  if (auth && requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />; // เปลี่ยนเส้นทางไปยังหน้า unauthorized
  }

  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
