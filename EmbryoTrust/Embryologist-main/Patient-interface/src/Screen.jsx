import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Login from './component/Login'
import User from './pages/User/User'
import Request from './pages/User/Medical/Request'
import ProtectedRoute from './component/protectRoute'
import AuthRoute from './component/authRoute'
import ResetPassword from './component/resetPassword'
import ForgotPassword from './component/forgotPassword'
import UpdatePassword from './component/updatePassword'

const Screen = () => {
  return (
    <div className='relative    min-h-screen mx-auto max-w-[1596px]  overflow-hidden'>
      <Routes>
        <Route path="/" element={<AuthRoute><App/></AuthRoute>}/>
        <Route path="/login" element={<AuthRoute><Login/></AuthRoute>}/>
        <Route path="/forgot-password" element={<AuthRoute><ForgotPassword/></AuthRoute>}/>
        <Route path="/reset-password/:token" element={<AuthRoute><ResetPassword/></AuthRoute>}/>
        <Route path="/patient-info" element={ <ProtectedRoute><User/></ProtectedRoute>}/>
        <Route path="/request" element={ <ProtectedRoute><Request/></ProtectedRoute>}/>
        <Route path="/updatepassword" element={ <ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
    
      </Routes>
    </div>
  )
}

export default Screen
