import React from "react";
//Route
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Hooks
import authUtils from "./hooks/useAuth.jsx";

//Pages
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
