import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Login from './component/Login'
import Profile from './component/Profile'
import Patientinfo from './pages/Patientinfo'
import Patientlist from './pages/Patientlist'
import Egginfo from './pages/Pateintdata/Egginfo'
import Records from './pages/Pateintdata/Records'
import Embryo from './pages/Pateintdata/Embryo'
import Verfication from './pages/Pateintdata/Verfication'
import AuthRoute from './component/authRoute'
import ProtectedRoute from './component/protectRoute' 
import ForgotPassword from './component/forgotPassword'
import ResetPassword from './component/resetPassword'
import Bloodtest from './pages/Pateintdata/Bloodtest'
import Ultrasound from './pages/Pateintdata/Ultrasound';
import Egginfomatiom from './pages/Pateintdata/reuseagg/Egginfo'
import Medical from './pages/Medical'
import UpdatePassword from './component/updatePassword'
import Request from './pages/Medical/Request'
import EggInfoEmbrologist from './pages/Pateintdata/EggInfoEmbrologist'

const Screen = () => {
  return (
    <div className='relative    min-h-screen mx-auto max-w-[1596px]  overflow-hidden'>
      <Routes>
        <Route path="/" element={ <AuthRoute><App/></AuthRoute>}/>
        <Route path="/login" element={ <AuthRoute><Login/></AuthRoute>}/>
        <Route path="/forgot-password" element={ <AuthRoute><ForgotPassword/></AuthRoute>}/>
        <Route path="/reset-password/:token" element={ <AuthRoute><ResetPassword/></AuthRoute>}/>
        <Route path="/login" element={ <AuthRoute><Login/></AuthRoute>}/>
        <Route path="/doctor-profile" element={ <ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/patient-list" element={<ProtectedRoute><Patientlist/></ProtectedRoute>}/>
        <Route path="/updatepassword" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
        <Route path="/patient-info/:patientid" element={<Patientinfo/>}/>
        <Route path="/verification/:patientid" element={<Verfication/>}/>
        <Route path="/records/:patientId" element={<Records/>}/>
        <Route path="/embryo-info/:patientid" element={<Embryo/>}/>
        <Route path="/blood-test/:patientid" element={<Bloodtest/>}/>
        <Route path="/Ultrasound/:patientid" element={<Ultrasound/>}/>
        <Route path="/egg-info/:patientid" element={<Egginfo/>}/>
        <Route path="/egg-info-for-Embrologist/:patientid" element={<EggInfoEmbrologist/>}/>
        <Route path="/egg-information/:patientid" element={<Egginfomatiom/>}/>
        <Route path="/egginformation" element={<Request/>}/>
          <Route path="/schedule/:patientid" element={<Medical/>}/> 
        {/* Egginfo */}
     

      </Routes>
    </div>
  )
}

export default Screen
