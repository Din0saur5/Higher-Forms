import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import AppLayout from "./components/AppLayout";
import "./App.css";
import { getLoggedInUser } from "../api";
import Strains from "./routes/Strains";

const router = createBrowserRouter([
  {
    loader: async () => getLoggedInUser(),
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/strains",
        element: <Strains />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
