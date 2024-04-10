import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js";
import NavbarMenu from "../Layout/NavbarMenu.js";
const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    <div className=" spinner-border text-secondary" role="status">
      <span className="sr-only"></span>
    </div>;
  }

  return isAuthenticated ? (<>
  <NavbarMenu/>

  {children}
  </>) : <Navigate to="/login" />;
};

export default ProtectedRoute;
