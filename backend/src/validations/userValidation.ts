import * as Yup from "yup";

export const registerSchema = Yup.object({
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
});

export const loginSchema = Yup.object({
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
});
