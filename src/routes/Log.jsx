import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import SEO from "../components/SEO";

function Log() {
  const [login, setLogin] = useState(true);

  return login ? (
    <>
      <SEO
        title="Login or Sign Up"
        description="Access your Higher Forms account to view rewards, manage profile, and redeem Form Coins."
        path="/login"
      />
      <Login setLogin={setLogin} />
    </>
  ) : (
    <>
      <SEO
        title="Create an Account"
        description="Join Higher Forms to earn Form Coins, redeem rewards, and track your profile."
        path="/login"
      />
      <SignUp setLogin={setLogin} />
    </>
  );
}

export default Log;
