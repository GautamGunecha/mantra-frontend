import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/Home'
import Login from '../pages/auth/Login';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Register from '../pages/auth/Register';
import EmailValidation from '../pages/auth/EmailValidation';
import NotFound from '../pages/NotFound';
import Forgot from '../pages/auth/Forgot';
import Profile from '../pages/Profile';

const ApplicationRoutes = () => {
  const { loggedIn } = useSelector(state => state.user)

  return (
    <BrowserRouter>
      <Banner />
      <Header />
      <Routes>
        <Route exact element={<Home />} path='/' />

        {/* application authentication path  */}
        <Route element={loggedIn ? <Home /> : <Login />} path='/login' />
        <Route element={loggedIn ? <Home /> : <Register />} path='/register' />
        <Route exact element={loggedIn ? <Home /> : <EmailValidation />} path='/validate/email/:token' />
        <Route exact element={<Forgot />} path='/forgot' />

        {/* private route */}

        {/* profile */}
        <Route element={<Profile />} path='/profile/:id' />

        {/* route for handling 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default ApplicationRoutes