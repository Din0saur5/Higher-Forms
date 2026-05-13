import React, { useState, useEffect } from "react";
import { getLoggedInUser, supabase } from "../../api"; 
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import SEO from "./SEO";

function ResetPassword() {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecoverySessionReady, setIsRecoverySessionReady] = useState(false);


  useEffect(() => {
    let isMounted = true;

    const handleRecoverySession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage("Failed to authenticate. Please request a new reset link.");
        return;
      }

      if (session) {
        setIsRecoverySessionReady(true);
        return;
      }

      setErrorMessage("Invalid or expired reset link. Please request a new one.");
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) {
        return;
      }

      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setErrorMessage("");
        setIsRecoverySessionReady(true);
      }
    });

    handleRecoverySession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isRecoverySessionReady) {
      setErrorMessage("Invalid or expired reset link. Please request a new one.");
      return;
    }

    

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password: password });

      if (error) {
        setErrorMessage(error.message);
      } else {
        const user = await getLoggedInUser();
        setUserData(user);
        navigate("/profile"); // Redirect after successful reset
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
      <SEO
        title="Reset Password"
        description="Reset your Higher Forms account password securely."
        path="/reset-password"
        robots="noindex, nofollow"
      />
      <div className="card border rounded-xl p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={(e)=>handlePasswordChange(e)} className="card-body">
          <h3 className="text-center text-xl mb-4">Reset Your Password</h3>

          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
          {!isRecoverySessionReady && !errorMessage && (
            <div className="text-sm mb-4">Validating your reset link...</div>
          )}

          
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || !isRecoverySessionReady}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
