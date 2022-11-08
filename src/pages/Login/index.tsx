import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import './login.css'

const Login = () => {
  const [displayLoginForm, setDisplayLoginForm] = useState(true);

  function displayForm(bool) {
    setDisplayLoginForm(bool);
  }

  switch (displayLoginForm) {
    case false:
      return <ForgotPasswordForm displayForm={displayForm} />;
    default:
      return <LoginForm displayForm={displayForm} />;
  }
};

export default Login;