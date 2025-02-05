import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import AppLayout from "./components/AppLayout";
import "./App.css";
import { getLoggedInUser } from "../api";
import Strains from "./routes/Strains";
import Log from "./routes/Log";
import LabResults from "./routes/LabResults";

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
      {
        path: "/login",
        element: <Log/>,
      },
      {
        path: "/lab-results",
        element: <LabResults />, 
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
