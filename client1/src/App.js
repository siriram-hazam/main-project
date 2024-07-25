import React, { useEffect, useState } from "react";
//Route
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

//Hooks
import authUtils from "./hooks/useAuth.jsx";

//Pages
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authUtils.checkAuthStatus();
        // console.log(res);
        if (res.data.status === "authenticated") {
          setAuth(true);
        }
      } catch (error) {
        setAuth(false);
        console.error("Error App checkAuth : ", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  });
  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={auth ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
