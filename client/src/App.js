import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useRoutes,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./assets/global/Theme-variable.js";

//Router
import Themeroutes from "./routes/Router.js";

//Hooks
import authUtils from "./hooks/useAuth.js";

//Pages
import Login from "./pages/Login/Login.js";

function App() {
  const [auth, setAuth] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const theme = baseTheme;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authUtils.checkAuthStatus();
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
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={auth ? <Navigate to="dashboards" /> : <Login />}
        />

        <Route
          path="*"
          element={
            <ThemeProvider theme={theme}>
              <RouterWrapper />
            </ThemeProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function RouterWrapper() {
  const routing = useRoutes(Themeroutes);
  return routing;
}

export default App;
