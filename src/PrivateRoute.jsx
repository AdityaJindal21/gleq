import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("studysync_token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("studysync_token");
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem("studysync_token");
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
