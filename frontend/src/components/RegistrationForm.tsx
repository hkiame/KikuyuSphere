import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, reset } from "../features/auth/authSlice";
import { RootState, AppDispatch } from "../app/store";
import LoadingComponent from "../components/LoadingComponent";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoggedIn, isLoading, isError, isSuccess, message } =
    useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message, { autoClose: false });
    }

    if (isLoggedIn) {
      navigate("/home");
    }

    if (isSuccess) {
      toast.success(message, { autoClose: false });
    }

    dispatch(reset());
  }, [user, isLoggedIn, isError, navigate, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name should be between 2 to 15 characters")
        .max(15, "First name should be between 2 to 15 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name should be between 2 to 15 characters")
        .max(15, "Last name should be between 2 to 15 characters"),
      username: Yup.string()
        .required("username is required")
        .min(2, "username should be between 2 to 15 characters")
        .max(15, "username should be between 2 to 15 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+-]).{8,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerUser(values));
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <h2 className="mt-5 mb-3">Register</h2>
      <p className="mb-4 lead">
        Welcome to KikuyuSphere! Please fill out the form below to create your
        account.
      </p>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className={`form-control ${
                formik.touched.firstName && formik.errors.firstName
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="First name"
              aria-label="First name"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="col">
            <input
              type="text"
              className={`form-control ${
                formik.touched.lastName && formik.errors.lastName
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Last name"
              aria-label="Last name"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className={`form-control ${
              formik.touched.username && formik.errors.username
                ? "is-invalid"
                : ""
            }`}
            placeholder="username"
            aria-label="username"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-danger">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <input
            type="text"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            id="email"
            name="email"
            placeholder="email"
            aria-label="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="row mb-4">
          <div className="col">
            <input
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Password"
              aria-label="Password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="col">
            <input
              type="password"
              className={`form-control ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Confirm password"
              aria-label="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="invalid-feedback">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
