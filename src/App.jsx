import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import AgeVerification from "./components/AgeVerification";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import ErrorPage from "./routes/ErrorPage";
import AppLayout from "./components/AppLayout";
import Strains from "./routes/Strains";
import Log from "./routes/Log";
import LabResults from "./routes/LabResults";
import RewardShop from "./routes/RewardShop";
import Checkout from "./routes/Checkout";
import Confirmation from "./routes/Confirmation";
import Cart from "./routes/Cart";
import Verify from "./routes/Verify";
import ResetPassword from "./components/resetpassword";
import { useUserContext } from "./components/UserContext"; 
import RecoveryProcessing from "./components/RecoveryProcessing";


const ProtectedRoute = ({ element }) => {
  const { userData, loading } = useUserContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return userData ? element : <Log />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <ProtectedRoute element={<Profile />} /> },
      { path: "/strains", element: <Strains /> },
      { path: "/login", element: <Log /> },
      { path: "/lab-results", element: <LabResults /> },
      { path: "/rewards", element: <ProtectedRoute element={<RewardShop />} /> },
      { path: "/checkout", element: <ProtectedRoute element={<Checkout />} /> },
      { path: "/confirmation", element: <ProtectedRoute element={<Confirmation />} /> },
      { path: "/cart", element: <Cart /> },
      { path: "/verify", element: <Verify /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/reset-proccessing", element: <RecoveryProcessing /> }
    ],
  },
]);

const BOT_REGEX =
  /(bot|crawler|spider|crawling|googlebot|bingbot|duckduckbot|baiduspider|yandex|slurp|sogou|facebot|ia_archiver|ahrefs|semrush|mediapartners-google|google-inspectiontool|facebookexternalhit|twitterbot|linkedinbot|pinterest|bingpreview)/i;

const App = () => {
  const isBot =
    typeof navigator !== "undefined" &&
    !!navigator.userAgent &&
    BOT_REGEX.test(navigator.userAgent);

  const [ageConfirmed, setAgeConfirmed] = React.useState(() => {
    if (isBot) return true;
    return typeof localStorage !== "undefined" &&
      localStorage.getItem("ageVerified") === "true";
  });

  return (
    <HelmetProvider>
      <UserProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {!ageConfirmed ? (
            <AgeVerification onConfirm={() => setAgeConfirmed(true)} />
          ) : (
            <RouterProvider router={router} />
          )}
        </Suspense>
      </UserProvider>
    </HelmetProvider>
  );
};

createRoot(document.getElementById("root")).render(<App />);
