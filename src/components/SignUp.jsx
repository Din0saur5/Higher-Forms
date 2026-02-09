/* eslint-disable react/prop-types */

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignUp } from "../../api";
import { useUserContext } from "../components/UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

//Form Validation 
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  displayName: Yup.string().required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Min 8 characters with uppercase, lowercase, number, and special character"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SignupForm = ({ setLogin }) => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const email = values.email.trim().toLowerCase();
      const displayName = values.displayName.trim();

      //Call SignUp function
      const userData = await SignUp(email, values.password, displayName);

      if (!userData) {
        throw new Error("Signup failed. Please try again.");
      }

      setUserData(userData);
      navigate("/"); 
    } catch (error) {
      setErrorMessage(error.message || "Signup failed. Please try again.");
    }

    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card auth-card border rounded-xl p-6 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <Formik
          initialValues={{ email: "", displayName: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="input input-bordered w-full" />
                {errors.email && touched.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="displayName">Display Name</label>
                <Field name="displayName" type="text" className="input input-bordered w-full" />
                {errors.displayName && touched.displayName && (
                  <div className="text-red-500">{errors.displayName}</div>
                )}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Field name="password">
                  {({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        inputMode="text"
                        className="input input-bordered w-full pr-12"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </button>
                    </div>
                  )}
                </Field>
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showConfirm ? "text" : "password"}
                        inputMode="text"
                        className="input input-bordered w-full pr-12"
                      />
                      <button
                        type="button"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirm((prev) => !prev)}
                      >
                        {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </button>
                    </div>
                  )}
                </Field>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500">{errors.confirmPassword}</div>
                )}
              </div>

              {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>

              <p className="text-center mt-4">
                Already have an account?{" "}
                <span className="underline text-green-600 cursor-pointer" onClick={() => setLogin(true)}>
                  Sign in
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
