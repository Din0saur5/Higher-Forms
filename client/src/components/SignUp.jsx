/* eslint-disable react/prop-types */

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SignUp } from '../../api';
import { useUserContext } from "../components/UserContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address'),
    
  displayName: Yup.string(),
    
  password: Yup.string()
    
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters with at least one uppercase letter and one number'
    ),
  confirmPassword: Yup.string()
    
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignupForm = ({ setLogin }) => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newSignUp, setNewSignUp] = useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSignUp((prev) => ({ ...prev, [name]: value }));
  };

  

  const signup = async (email, displayName, password) => {
    try {
      console.log(email)
      const response = await SignUp(email, password, displayName);
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
        navigate('/');
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSubmit = async ( ) => {

    setIsLoading(true);
    

    try {
      
      await signup(newSignUp.email, newSignUp.displayName, newSignUp.password);
    } catch (error) {
      console.error('Submission error:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card border rounded-xl p-6 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <Formik
          initialValues={newSignUp}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="label-text">
                  Email
                  {errors.email && touched.email && (
                    <span className="label-text-alt ml-8 text-red-500"> - {errors.email}</span>
                  )}
                </label>
                <Field
                  name="email"
                  type="email"
                  value={newSignUp.email}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.email && touched.email ? 'outline-red-500' : 'outline-green-500'}`}
                />
              </div>

              <div>
                <label htmlFor="displayName" className="label-text">
                  Display Name
                  {errors.displayName && touched.displayName && (
                    <span className="label-text-alt ml-8 text-red-500"> - {errors.displayName}</span>
                  )}
                </label>
                <Field
                  name="displayName"
                  type="text"
                  value={newSignUp.displayName}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.displayName && touched.displayName ? 'outline-red-500' : 'outline-green-500'}`}
                />
              </div>

              <div>
                <label htmlFor="password" className="label-text">
                  Password
                  {errors.password && touched.password && (
                    <span className="label-text-alt ml-8 text-red-500"> - {errors.password}</span>
                  )}
                </label>
                <Field
                  name="password"
                  type="password"
                  value={newSignUp.password}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.password && touched.password ? 'outline-red-500' : 'outline-green-500'}`}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="label-text">
                  Confirm Password
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="label-text-alt ml-8 text-red-500"> - {errors.confirmPassword}</span>
                  )}
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  value={newSignUp.confirmPassword}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.confirmPassword && touched.confirmPassword ? 'outline-red-500' : 'outline-green-500'}`}
                />
              </div>

              {isLoading ? (
                <button type="submit" className="form-control mt-6 btn btn-primary" disabled>
                  <span className="loading loading-infinity loading-lg"></span> Loading...
                </button>
              ) : (
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              )}

              <p className="text-center mt-4">
                Already have an account?&nbsp;
                <span
                  className="underline text-green-600 hover:text-green-700 cursor-pointer"
                  onClick={() => setLogin(true)}
                >
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
