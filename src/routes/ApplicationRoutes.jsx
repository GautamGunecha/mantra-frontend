import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home'
import Login from '../pages/auth/Login';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Register from '../pages/auth/Register';
import EmailValidation from '../pages/auth/EmailValidation';
import NotFound from '../pages/NotFound';
import Forgot from '../pages/auth/Forgot';
import { useSelector } from 'react-redux';

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

        {/* route for handling 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default ApplicationRoutes