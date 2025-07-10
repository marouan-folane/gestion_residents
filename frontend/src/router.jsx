import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/authentication/Login";
import Register from "./views/authentication/Register";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
  // DefaultLayout
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path:"/dashboard",
        element: <Dashboard/>
      },


    ],
  },
  
  // GuestLayout
  {
    path: "/auth",
    element: <GuestLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Register />,
      },
      
    ],
  },
  
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
