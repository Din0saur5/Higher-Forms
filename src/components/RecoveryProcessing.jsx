// notes for tmrw:
// middle page fetches recovery url then user clicks next and we can set the session and change the CgPassword.
//add redirects to supabase 


import { useEffect, useState } from "react";

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
        const match = text.match(/href="(.*?)"/); // Extract the redirect link from the <a> tag

        if (match && match[1]) {
          setRedirectUrl(match[1]); // Store the final auth URL
          setStatus("Authentication complete. Click below to continue.");
        } else {
          setStatus("Failed to authenticate. Try again.");
        }
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    };

    verifyToken();
  }, []);

  return (
    <div>
      <h2>{status}</h2>
      {redirectUrl && (
        <a href={redirectUrl} style={{ padding: "10px 20px", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}>
          Continue to Reset Password
        </a>
      )}
    </div>
  );
}
