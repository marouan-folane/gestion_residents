import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/authentication/Login";
import Register from "./views/authentication/Register";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import SyndicateHomePage from "./components/Home";
import CreateImmeuble from "./views/CreateImmeuble";

const router = createBrowserRouter([

    {
        path: "/",
        element: <SyndicateHomePage />,
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [

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
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/immeubleform",
                element: <CreateImmeuble />,
            }
        ],
    },
    {},
    {
        path: "*",
        element: <NotFound />,
    },
]);
export default router;
