import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile"; 
import ErrorPage from "./routes/ErrorPage";
import AppLayout from "./components/AppLayout";
import "./App.css";
import { getLoggedInUser } from "../api";
import Strains from "./routes/Strains";
import Log from "./routes/Log"; 
import LabResults from "./routes/LabResults";
import RewardShop from "./routes/RewardShop";
import { UserProvider } from "./components/UserContext";
import AgeVerification from "./components/AgeVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    loader: async () => getLoggedInUser(),
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> }, 
      { path: "/strains", element: <Strains /> },
      { path: "/login", element: <Log /> },
      { path: "/lab-results", element: <LabResults /> },
      { path: "/rewards", element: <RewardShop /> },
    ],
  },
]);

const App = () => {
  const [ageConfirmed, setAgeConfirmed] = React.useState(
    localStorage.getItem("ageVerified") === "true"
  );

  return (
    <UserProvider>
      {!ageConfirmed ? (
        <AgeVerification onConfirm={() => setAgeConfirmed(true)} />
      ) : (
        <RouterProvider router={router} />
      )}
    </UserProvider>
  );
};

createRoot(document.getElementById("root")).render(<App />);
