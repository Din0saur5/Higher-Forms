/* eslint-disable react/prop-types */

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// fns to add 
// sign up 
// check display name

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  displayName: Yup.string()
  .required('Required'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters with at least one uppercase letter and one number'
    ),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignupForm = ({setLogin}) => {
  const server = import.meta.env.VITE_URL
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false) 
  
  
  //I have to add this to api.js
  const checkDisplayNameExists = (displayName) => {
    const url = `${server}/check_user/${displayName}`; // Replace with your actual server URL

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // If you're handling sessions
    })
    .then(response => {
      if (response.ok) {
        // If the response is ok (status 200), then the display name is available
        return false;
      } else if (response.status === 409) {
        // If the response status is 409, the display name already exists
        return true;
      }
      throw new Error(`Server responded with status: ${response.status}`);
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; // Rethrow or handle error appropriately
    });
  };

  function signup(email, displayName, password) {
    const url = `${server}/signup`; // Change to your actual server URL
    const data = {
      email: email,
      display_name: displayName,
      password: password

    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include' // if you're handling sessions
    })
    .then(response =>{ if(response.ok){
      return response.json()
        
    } else{
      throw new Error("HTTP error " + response.status)
    }
    })
    .then(data=>{
      setUserData(data)
      navigate('/home')
     
    })
    
      
    
    .catch((error) => {
      console.error('Error:', error);
      location.reload()
    });
  }




  return (
    <div className='flex h-screen items-center justify-center'>
    <div className='card border rounded-xl p-6 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
    <Formik
      initialValues={{
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting,  setFieldError  }) => {
        setIsLoading(true)
        try {
          const displayNameExists = await checkDisplayNameExists(values.displayName);
          if (displayNameExists) {
            setFieldError('displayName', 'Display name already taken');
            throw new Error("Display Name Taken")
          }else{
            signup(values.email, values.displayName, values.password)
          }
        } catch (error) {
          console.error('Submission error:', error);
          // Handle other submission errors
        }
        
        setSubmitting(false); // Stop the submission process (hide loading indicators, etc.)
        setIsLoading(false)
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="label-text">
              Email
              {errors.email && touched.email && (
                <span className="label-text-alt ml-8  text-red-500"> - {errors.email}</span>
              )}
            </label>
            <Field
              name="email"
              type="email"
              className={`input input-bordered w-full ${errors.email && touched.email ? 'outline-red-500' : 'outline-green-500'}`}
            />
              {/* <ErrorMessage name="email" component="div" className="text-red-500" /> */}
          </div>

          <div>
            <label htmlFor="displayName" className="label-text">
              Display Name
              {errors.displayName && touched.displayName && (
                <span className="label-text-alt  ml-8  text-red-500"> - {errors.displayName}</span>
              )}
            </label>
            <Field
              name="displayName"
              type="text"
              className={`input input-bordered w-full ${errors.displayName && touched.displayName ? 'outline-red-500' : 'outline-green-500'}`}
            />
             {/* <ErrorMessage name="displayName" component="div" className="text-red-500" /> */}
          </div>

          <div>
            <label htmlFor="password" className="label-text">
              Password
              {errors.password && touched.password && (
                <span className="label-text-alt ml-8  text-red-500"> - {errors.password}</span>
              )}
            </label>
            <Field
              name="password"
              type="password"
              className={`input input-bordered w-full ${errors.password && touched.password ? 'outline-red-500' : 'outline-green-500'}`}
            />
            {/* <ErrorMessage name="password" component="div" className="text-red-500" /> */}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label-text">
              Confirm Password
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="label-text-alt ml-8   text-red-500"> - {errors.confirmPassword}</span>
              )}
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className={`input input-bordered w-full ${errors.confirmPassword && touched.confirmPassword ? 'outline-red-500' : 'outline-green-500'}`}
            /> 
            {/* <ErrorMessage name="confirmPassword" component="div" className="text-red-500" /> */}
          </div>

         { isLoading? (
          <button className="form-control mt-6">
            <span className="btn btn-primary loading loading-infinity loading-lg"></span>
            loading
          </button>
         ):
         (  <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          )}
          <p className="text-center mt-4">
          Already have an account?&nbsp;
          <span 
            className="underline text-green-600 hover:text-green-700 cursor-pointer"
            onClick={() => setLogin(true)}
          > Sign in</span>
        </p>
        </Form>
        
      )}

    </Formik>
    </div>
    </div>
  );
};

export default SignupForm;