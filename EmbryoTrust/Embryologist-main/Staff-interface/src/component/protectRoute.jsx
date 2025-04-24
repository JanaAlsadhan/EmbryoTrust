import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import StatesContext from "../../context/StatesContext"; // Adjust the path if needed

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(StatesContext); // Get auth state from context
  
  if (!state.user || state.user.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

