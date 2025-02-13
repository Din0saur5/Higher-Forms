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
import Checkout from "./routes/Checkout";
import Confirmation from "./routes/Confirmation";
import Cart from "./routes/Cart";
import { UserProvider, useUserContext } from "./components/UserContext";
import AgeVerification from "./components/AgeVerification";
import Verify from "./routes/Verify";
import WalletAnimation from "./components/FormcoinAddingAni";

// Higher-Order Component (HOC) for authentication check
const ProtectedRoute = ({ element }) => {
  const { userData } = useUserContext();
  return userData ? element : <Log />;  
};

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
      { path: "/rewards", element: <ProtectedRoute element={<RewardShop />} /> }, 
      { path: "/checkout", element: <ProtectedRoute element={<Checkout />} /> },
      { path: "/confirmation", element: <ProtectedRoute element={<Confirmation />} /> },
      { path: "/cart", element: <Cart /> },
      { path: "/verify", element: <Verify /> },
      { path: "/coins", element: <WalletAnimation /> }
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
