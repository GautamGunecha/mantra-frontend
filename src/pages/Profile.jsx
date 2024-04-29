import React from 'react'
import Navbar from '../components/profile/Navbar'
import DetailSection from '../components/profile/DetailSection'

const Profile = () => {
  return (
    <React.Fragment>
      <div className='flex gap-4'>
        <Navbar />
        <DetailSection />
      </div>
    </React.Fragment>
  )
}

export default Profile
