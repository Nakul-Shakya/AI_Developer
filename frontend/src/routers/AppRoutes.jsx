import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "../screens/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h1>Register</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
