import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import StatesContext from "../../context/StatesContext"; // Adjust the path if needed

const AuthRoute = ({ children }) => {
  const { state } = useContext(StatesContext); // Get auth state from context

  // Ensure state.user exists before checking role
  if (state.user ) {
    return <Navigate to="/patient-info" replace />;
  }

  return children;
};

export default AuthRoute;