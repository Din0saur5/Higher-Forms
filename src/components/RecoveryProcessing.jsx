import { useEffect, useState } from "react";
import SEO from "./SEO";

export default function RecoveryProcessing() {
  const [status, setStatus] = useState("Verifying...");
  const [redirectUrl, setRedirectUrl] = useState("");

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
      const confirmationUrl = `${supabaseUrl}?token=${token}&type=recovery&redirect_to=https://higher-forms.com`;

      try {
        // Fetch Supabase confirmation URL
        const response = await fetch(confirmationUrl, {
          method: "GET",
          credentials: "include",
        });

        const text = await response.text(); // Get the raw response
        console.log(text);

        // Extract the access token and refresh token from the response HTML
        const accessTokenMatch = text.match(/access_token=([\w.-]+)/);
        const refreshTokenMatch = text.match(/refresh_token=([\w-]+)/);

        if (accessTokenMatch && refreshTokenMatch) {
          const accessToken = accessTokenMatch[1];
          const refreshToken = refreshTokenMatch[1];

          // Construct the reset password URL dynamically
          const resetPasswordUrl = `https://higher-forms.com/reset-password?access_token=${accessToken}&refresh_token=${refreshToken}`;
          
          setRedirectUrl(resetPasswordUrl);
          setStatus("Authentication complete. Click below to continue.");
        } else {
          setStatus("Failed to extract authentication tokens. Try again.");
        }
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <SEO
        title="Recovery Processing"
        description="Verifying your Higher Forms recovery link. You’ll be redirected to reset your password."
        path="/reset-proccessing"
      />
      <h2>{status}</h2>
      {redirectUrl && (
        <a href={redirectUrl} style={{ padding: "10px 20px", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold", marginTop: "20px" }}>
          Continue to Reset Password
        </a>
      )}
    </div>
  );
}
