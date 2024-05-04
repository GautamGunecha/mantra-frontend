import React, { useState } from 'react'
import Navbar from '../components/profile/Navbar'
import DetailSection from '../components/profile/DetailSection'

const Profile = () => {
  const [activeNavItem, setActiveNavItem] = useState('');

  const handleNavItemClick = (text) => {
    setActiveNavItem(text);
  }

  return (
    <React.Fragment>
      <div className='flex gap-4'>
        <Navbar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />
        <DetailSection activeNavItem={activeNavItem} />
      </div>
    </React.Fragment>
  )
}

export default Profile
