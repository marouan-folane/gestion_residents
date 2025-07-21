import { createBrowserRouter } from "react-router-dom";
import Login from "./views/authentication/Login";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import SyndicateHomePage from "./components/Home";
import Dashboard from "./views/dashboard/Dashboard";
import CreateImmeuble from "./views/immeubles/CreateImmeuble";
import Owners from "./views/owners/Owners";

const router = createBrowserRouter([
  {
    // ROOT: could be used for global providers, errorElement, etc.
    path: "/",
    children: [
      {
        // Public home page, at "/"
        index: true,
        element: <SyndicateHomePage />,
      },

      {
        // Guests (not authenticated) use this layout
        element: <GuestLayout />,
        children: [
          {
            path: "auth/login",
            element: <Login />,
          },
        ],
      },

      {
        // Authenticated users use this layout
        element: <DefaultLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              {
                index: true,
                element: <div>Welcome to the Dashboard</div>,
              },
              {
                path: "owners",
                element: <Owners />,
              },
            ],
          },
          {
            path: "immeubleform",
            element: <CreateImmeuble />,
          },
        ],
      },

      {
        // Catch‑all 404
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
