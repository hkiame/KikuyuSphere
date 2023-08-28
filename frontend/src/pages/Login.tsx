import React from "react";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="container my-4">
      <h2>Welcome Back!</h2>
      <p className="lead">
        Log in to your account and continue your journey with us.
      </p>
      <LoginForm />
    </div>
  );
};

export default Login;
