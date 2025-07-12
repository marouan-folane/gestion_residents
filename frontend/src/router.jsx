import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/authentication/Login";
import Register from "./views/authentication/Register";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import SyndicateHomePage from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/", 
        element: <SyndicateHomePage />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
