import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState, AppDispatch } from "../app/store";
import LoadingComponent from "../components/LoadingComponent";
import { loginUser, reset } from "../features/auth/authSlice";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn, isLoading, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, { autoClose: false });
    }

    if (isLoggedIn) {
      navigate("/home");
    }

    dispatch(reset());
  }, [isLoggedIn, isError, navigate, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="">
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
        <div className="mb-4">
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
        <div className="d-grid">
          <button type="submit" className="btn bg-light-beige">
            Login
          </button>
        </div>
      </form>
      <p className="mt-3 text-muted">
        Don't have an account yet?{" "}
        <Link to="/register" className="text-muted">
          Sign up here
        </Link>
      </p>
      <p className="text-muted">
        Forgot your password?{" "}
        <Link to="/forgot-password" className="text-muted">
          Reset it here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
