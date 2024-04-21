import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home'
import Login from '../pages/auth/Login';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Register from '../pages/auth/Register';

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Banner />
      <Header />
      <Routes>
        <Route exact element={<Home />} path='/' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default ApplicationRoutes