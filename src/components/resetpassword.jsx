import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLoggedInUser, supabase } from "../../api"; 
import { useUserContext } from "./UserContext";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const {userData, setUserData} =useUserContext()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  

  useEffect(() => {
    const authenticateUser = async () => {
      const urlParams = new URLSearchParams(location.search);
      const access_token = urlParams.get("access_token");
      const refresh_token = urlParams.get("refresh_token");

      if (!access_token || !refresh_token) {
        setErrorMessage("Missing authentication tokens. Please request a new reset link.");
        return;
      }

      else{

        const { error } = await supabase.auth.setSession({ access_token, refresh_token });

        if (error) {
          setErrorMessage("Failed to authenticate. Please request a new reset link.");
        } 
        else{
        const user = await getLoggedInUser()
        setUserData(user)
        }
        
      }
      
    };

    authenticateUser();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isAuthenticated) {
      setErrorMessage("Authentication failed. Please request a new reset link.");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password:password });

      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate("/profile"); // Redirect to login after successful reset
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card border rounded-xl p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={(e)=>handlePasswordChange(e)} className="card-body">
          <h3 className="text-center text-xl mb-4">Reset Your Password</h3>

          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          {isAuthenticated ? (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="input input-bordered mb-4"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center">Authenticating...</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
