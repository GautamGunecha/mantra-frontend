import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import { CiWallet, CiTrophy, CiLocationOn, CiLogout } from "react-icons/ci";
import { IoTicketOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdOutlinePayments, MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import keys from '../../assets/configs/keys';
import { initiateLogOut, LogoutSuccess, LogoutFail } from '../../redux/user/reducer'

const Navbar = ({ activeNavItem, handleNavItemClick }) => {
  const [showNav, setShowNav] = useState(false)
  const { currentUser, loading } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { role } = currentUser
    const isAdmin = role.includes('admin');
    const isVendor = role.includes('vendor')

    if (isAdmin) setShowNav(true);
    if (isVendor) setShowNav(true);
  }, [currentUser])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(initiateLogOut());

      const uri = `${keys.backendUri}/auth/logout`
      const response = await axios.post(uri)
      const { success, data } = response.data

      if (success) {
        dispatch(LogoutSuccess(data))
        localStorage.removeItem('authToken')

        navigate('/')
      }
    } catch (error) {
      console.error(error)
      dispatch(LogoutFail(error.response.data.info))
    }
  };

  return (
    <div className="flex flex-col w-64 ml-[5.5rem] font-mono">
      <div className="p-4 text-center shadow mb-4 cursor-pointer" onClick={() => handleNavItemClick('')}>
        <p className="font-bold text-2xl">{currentUser.profile.firstName} {currentUser.profile.lastName}</p>
        <p className="font-bold">Rs 0 Balance</p>
      </div>

      <div className="shadow p-4 bg-gray-200 mb-4">
        <NavItem icon={<CiWallet />} text="Wallet" active={activeNavItem === 'Wallet'} handleClick={handleNavItemClick} />
        <NavItem icon={<CiTrophy />} text="My Rewards" active={activeNavItem === 'My Rewards'} handleClick={handleNavItemClick} />
        <NavItem icon={<IoTicketOutline />} text="My Orders" active={activeNavItem === 'My Orders'} handleClick={handleNavItemClick} />
        <NavItem icon={<CiLocationOn />} text="Addresses" active={activeNavItem === 'Addresses'} handleClick={handleNavItemClick} />
        <NavItem icon={<MdOutlinePayments />} text="Payment Methods" active={activeNavItem === 'Payment Methods'} handleClick={handleNavItemClick} />
        <NavItem icon={<IoShareSocialOutline />} text="Social Networks" active={activeNavItem === 'Social Networks'} handleClick={handleNavItemClick} />
        {showNav && <NavItem icon={<MdOutlineAdminPanelSettings />} text="Admin" active={activeNavItem === 'Admin'} handleClick={handleNavItemClick} />}
        {showNav && <NavItem icon={<IoMdAdd />} text="Add Product" active={activeNavItem === 'Add Product'} handleClick={handleNavItemClick} />}
      </div>

      <div className="shadow p-4 bg-gray-200 mb-7">
        <form onSubmit={handleSubmit}>
          <button type='submit' disabled={loading} className='flex items-center gap-2 cursor-pointer text-center'><CiLogout />Log Out</button>
        </form>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  activeNavItem: PropTypes.string.isRequired,
  handleNavItemClick: PropTypes.func.isRequired
}

const NavItem = ({ icon, text, active, handleClick }) => {
  return (
    <div
      className={`flex items-center gap-2 mb-6 cursor-pointer text-center rounded-lg p-2 ${active ? 'bg-blue-100 border-l-4 font-semibold border-blue-500' : ''}`}
      onClick={() => handleClick(text)}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Navbar;
