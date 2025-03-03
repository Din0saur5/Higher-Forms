import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../api"; 

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the token from the URL (supabase sends it as a query param)
  const urlParams = new URLSearchParams(location.search);
const token = urlParams.get("access_token"); 


    useEffect(() => {
      const verifyToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
  
        if (!token) {
          setStatus("Invalid or missing token.");
          return;
        }
  
        // Construct Supabase verification URL
        const supabaseUrl = "https://mlxvwhdswsfgelvuxicb.supabase.co/auth/v1/verify";
        const confirmationUrl = `${supabaseUrl}?token=${token}&type=recovery&redirect_to=https://higher-forms.com/reset-password`;
  
        try {
          // Fetch Supabase confirmation URL
          const response = await fetch(confirmationUrl, {
            method: "GET",
            credentials: "include",
          });
  
          const data = await response.json(); // Attempt to parse JSON response
          setResponseData(data); // Store response data for debugging
  
          if (response.ok) {
            setStatus("Authenticated! Enter your new password.");
          } else {
            setStatus(`Authentication failed: ${data.error || "Unknown error"}`);
          }
        } catch (error) {
          setStatus(`Failed to authenticate: ${error.message}`);
        }
      };
  
      verifyToken();
    }, []);

 

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.api.updateUser(token, { password });

      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate("/login"); 
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
        <form onSubmit={handlePasswordChange} className="card-body">
          <h3 className="text-center text-xl mb-4">Reset Your Password</h3>

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

          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
