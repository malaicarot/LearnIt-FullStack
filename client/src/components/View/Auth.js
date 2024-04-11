import React, { useContext } from "react";
import LoginForm from "../auth/LoginForm.js";
import RegisterForm from "../auth/RegisterForm.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import {useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  let body;

  if (authLoading) {
    body = (
      <div className='d-flex justify-content-center mt-2'>
      <Spinner animation='border' variant='info' />
    </div>
    );
  } else if (isAuthenticated) {
    navigate("/dashboard")

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
