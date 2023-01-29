import React from "react";
import { useRoutes } from "react-router-dom";
//
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChnagePassowrd from "./pages/ChnagePassowrd";
import { Authenticated, PrivateRoute } from "./middleware/authRoute";

export default function Routes() {
  const Routes = useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Login />
        </PrivateRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PrivateRoute>
          <Register />
        </PrivateRoute>
      ),
    },
    {
      path: "/user/:username",
      element: (
        <Authenticated>
          <Profile />
        </Authenticated>
      ),
    },
    {
      path: "/forgotPassword",
      element: (
        <PrivateRoute>
          <ForgotPassword />
        </PrivateRoute>
      ),
    },
    {
      path: "/verifyotp/:username",
      element: (
        <PrivateRoute>
          <VerifyOTP />
        </PrivateRoute>
      ),
    },
    {
      path: "/chnagePassword/:username",
      element: (
        <PrivateRoute>
          <ChnagePassowrd />
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <p className="text-white">404 Error</p>,
    },
  ]);
  return Routes;
}
