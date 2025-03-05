import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

function PrivateRoute({ element }) {
  const { currentUser } = useContext(UserContext);

  return currentUser ? element : <Navigate to="/" replace />;
}

export default PrivateRoute;
