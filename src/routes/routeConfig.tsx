import { createBrowserRouter } from "react-router-dom";

import IndexAuth from "../features/auth/index.Auth";
import IndexChat from "../features/chat/index.Chat";
import IndexHome from "../features/home/index.Home";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  /* ------------------------------------------------------------------------ */
  /* PUBLIC ROUTES                                                            */
  /* ------------------------------------------------------------------------ */

  {
    path: "/",
    element: <IndexHome />,
  },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <IndexAuth />,
      },
      {
        path: "/register",
        element: <IndexAuth />,
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* PROTECTED ROUTES                                                         */
  /* ------------------------------------------------------------------------ */

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/chat",
        element: <IndexChat />,
      },
    ],
  },
]);