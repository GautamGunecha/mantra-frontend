import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home'
import Login from '../pages/auth/Login';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Register from '../pages/auth/Register';
import EmailValidation from '../pages/auth/EmailValidation';
import NotFound from '../pages/NotFound';

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Banner />
      <Header />
      <Routes>
        <Route exact element={<Home />} path='/' />

        {/* application authentication path  */}
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route exact element={<EmailValidation />} path='/validate/email/:token' />

        {/* route for handling 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default ApplicationRoutes