import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Patientinfo from "./pages/Patientinfo";
import Patientlist from "./pages/Patientlist";
import Medical from "./pages/Pateintdata/Medical";
import Egginfo from "./pages/Pateintdata/Egginfo";
import Records from "./pages/Pateintdata/Records";
import Embryo from "./pages/Pateintdata/Embryo";
import AddPatient from "./pages/AddPatient";
import AddDoctor from "./pages/AddDoctor";
import ProtectedRoute from "./component/protectRoute";
import AuthRoute from "./component/authRoute";
import ForgotPassword from "./component/forgotpassword";
import ResetPassword from "./component/resetPassword";
import UpdatePassword from "./component/updatePassword";


const Screen = () => {
  return (
    <div className="relative min-h-screen mx-auto max-w-[1596px] overflow-hidden">
      <Routes>
        <Route path="/" element={ <AuthRoute><App /> </AuthRoute> } />
        <Route path="/forgot-password" element={ <AuthRoute><ForgotPassword /> </AuthRoute> } />
        <Route path="/reset-password/:token" element={ <AuthRoute><ResetPassword /> </AuthRoute> } />
        <Route path="/login" element={ <AuthRoute><Login /></AuthRoute>} />
        
        {/* Protected Routes */}
        <Route
          path="/fcr-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-list"
          element={
            <ProtectedRoute>
              <Patientlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-info/:patientId"
          element={
            <ProtectedRoute>
              <Patientinfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule/:patientId"
          element={
            <ProtectedRoute>
              <Medical />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records/:patientId"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />
        <Route
          path="/egg-info/:patientId"
          element={
            <ProtectedRoute>
              <Egginfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/embryo-info/:patientId"
          element={
            <ProtectedRoute>
              <Embryo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-patient"
          element={
            <ProtectedRoute>
              <AddPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-doctor"
          element={
            <ProtectedRoute>
              <AddDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updatepassword"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Screen;
