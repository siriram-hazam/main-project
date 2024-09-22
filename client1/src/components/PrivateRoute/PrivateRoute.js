import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authUtils from "../../hooks/useAuth";

const PrivateRoute = ({ children, requiredRole }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userCount, setUserCount] = useState(0);

  console.log("User Count:", userCount);
  console.log("Auth Status:", auth);

  useEffect(() => {
    const loadAuthAndUserCount = async () => {
      setLoading(true); // ตั้งค่า loading เป็น true ก่อนเริ่มโหลด
      try {
        const [authRes, userCountRes] = await Promise.all([
          authUtils.checkAuthStatus(),
          authUtils.checkUserSystem(),
        ]);

        if (authRes.data.status === "authenticated") {
          setAuth(true);
          setUserRole(authRes.data.user.role);
        } else {
          setAuth(false);
        }

        setUserCount(userCountRes.data.haveUser || 0);
      } catch (error) {
        setAuth(false);
        console.error("Error in PrivateRoute: ", error);
      } finally {
        setLoading(false); // ตั้งค่า loading เป็น false หลังจากทุกอย่างเสร็จสิ้น
      }
    };

    loadAuthAndUserCount();
  }, []); // ใช้ dependency array ว่างเพื่อให้ run เพียงครั้งเดียว

  if (loading) {
    return <div>Loading....</div>;
  }

  // ตรวจสอบยศของผู้ใช้
  if (auth && requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return auth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
