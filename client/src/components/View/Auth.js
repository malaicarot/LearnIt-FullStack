import React, { useContext } from "react";
import LoginForm from "../auth/LoginForm.js";
import RegisterForm from "../auth/RegisterForm.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { Navigate } from "react-router-dom";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div
        className=" spinner-border text-secondary"
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    );
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn It</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
