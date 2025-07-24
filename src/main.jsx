import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './Navbar/Navbar.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Grouppage from './Dashboard/Grouppage.jsx'
// import Grouppage from './Dashboard/Grouppage.jsx'
import LandingPage from './LandingPage.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import CalendarPage from './calendar/CalendarPage.jsx'
import ChangePasswordForm from './Navbar/ChangePasswordForm.jsx'
import ForgotPassword from './LoginSignUp/ForgotPassword.jsx'
import ResetPassword from './LoginSignUp/ResetPassword.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
       <Route
          path="/group/:groupId"
          element={
            <PrivateRoute>
              <Grouppage />
            </PrivateRoute>
          }
        />
         <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarPage></CalendarPage>
            </PrivateRoute>
          }
        />
         <Route
          path="/ChangePassword"
          element={
            <PrivateRoute>
             <ChangePasswordForm/>
            </PrivateRoute>
          }
        />
        <Route
        path='/forgotpassword'
        element={
          <ForgotPassword></ForgotPassword>
        }
        />
        <Route
        path='/reset-password'
        element={
          <ResetPassword/>
        }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
