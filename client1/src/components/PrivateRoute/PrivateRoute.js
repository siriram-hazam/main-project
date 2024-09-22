import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authUtils from "../../hooks/useAuth";

const PrivateRoute = ({ children, requiredRole, status_route }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const [status, setStatus] = useState(null);

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

    const checkUserSystem = async () => {
      try {
        const status = await authUtils.checkUserSystem();
        setStatus(status.data.status);
        // console.log("PrivateRoute checkUser : ", status.data.status);
      } catch (error) {
        console.error("Error PrivateRoute checkUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSystem();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (status == "false" && status_route == "false") {
    return <Navigate to="/register-superadmin" />;
  }

  // ตรวจสอบยศของผู้ใช้
  if (auth && requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />; // เปลี่ยนเส้นทางไปยังหน้า unauthorized
  }

  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
