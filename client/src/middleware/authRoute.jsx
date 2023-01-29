import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const Authenticated = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={"/"} replace={true}></Navigate>;

  return children;
};

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    return (
      <Navigate
        to={`/user/${decodedToken?.username}`}
        replace={true}
      ></Navigate>
    );
  }
  return children;
};
