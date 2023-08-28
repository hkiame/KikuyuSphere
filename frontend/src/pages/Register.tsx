import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const Register: React.FC = () => {
  return (
    <div className="container my-4">
      <h2 className="mb-3">Register</h2>
      <p className="mb-4 lead">
        Welcome to KikuyuSphere! Please fill out the form below to create your
        account.
      </p>
      <RegistrationForm />
    </div>
  );
};

export default Register;
