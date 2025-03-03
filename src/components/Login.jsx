import { useState } from "react";
import { LogIn, resetPassword } from "../../api"; // Ensure resetPassword is imported from api.js
import { useUserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

function Login({ setLogin }) {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); 
  const [resetMessage, setResetMessage] = useState("");  

  const handleChange = (e) => {
    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value,
    });
  };

  // Login function
  const login = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await LogIn(loginValue.email, loginValue.password);

      if (!response.success) { 
        setErrorMessage(response.message || "Invalid email or password. Please try again.");
      } else {
        setUserData(response.user);
        navigate("/profile"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }

    setIsLoading(false);
  };

  // Handle password reset
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");  // Reset the message when user attempts to submit for password reset

    try {
      const { success, message } = await resetPassword(loginValue.email);

      if (!success) {
        setErrorMessage(message);
      } else {
        setResetMessage("Password reset email sent! Please check your inbox.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card border rounded-xl p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={isForgotPassword ? handleForgotPassword : login} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">{isForgotPassword ? "Enter your email" : ""}</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered mb-4"
              required
              value={loginValue.email}
              onChange={handleChange}
              autoComplete="email"
            />

            {!isForgotPassword && (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  value={loginValue.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsForgotPassword(true);  // Switch to forgot password form
                    }}
                  >
                    Forgot password?
                  </a>
                </label>
              </>
            )}
          </div>

          {/* Show error message if login fails */}
          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

          {/* Show success message if password reset email is sent */}
          {resetMessage && <div className="text-green-500 text-sm mt-2">{resetMessage}</div>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Logging in..." : isForgotPassword ? "Send Reset Link" : "Login"}
            </button>
          </div>
        </form>

        {/* Sign up link */}
        {!isForgotPassword && (
          <p className="text-center mt-4">
            If you don't yet have an account,&nbsp;
            <span
              className="underline text-green-600 hover:text-green-700 cursor-pointer"
              onClick={() => setLogin(false)}
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
