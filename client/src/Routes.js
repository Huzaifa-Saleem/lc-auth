import React from "react";
import { useRoutes } from "react-router-dom";
//
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChnagePassowrd from "./pages/ChnagePassowrd";

export default function Routes() {
  const Routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/user/:username",
      element: <Profile />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/verifyotp",
      element: <VerifyOTP />,
    },
    {
      path: "/chnagePassowrd",
      element: <ChnagePassowrd />,
    },
    {
      path: "*",
      element: <p className="text-white">404 Error</p>,
    },
  ]);
  return Routes;
}
