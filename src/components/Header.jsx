import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CiSearch, } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const { currentUser, loggedIn } = useSelector(state => state.user)

  return (
    <div className='p-4 flex justify-around items-center'>
      <div className='ml-16 relative flex justify-center'>
        <CiSearch size={25} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="pl-12 bg-transparent pr-4 py-2 focus:outline-none"
        />
      </div>

      <div className="text-center flex-1">
        <Link to='/'>
          <h1 className="text-2xl font-bold">Mantra Fragrances</h1>
          <p className="text-sm">Elevate your senses, one scent at a time.</p>
        </Link>
      </div>

      <div className='flex gap-8 mr-20'>
        {
          loggedIn ?
            <Link to='/profile'>
              <p className='tracking-widest font-mono cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>
                {currentUser.profile.firstName}
              </p>
            </Link>
            : <Link to='/login'>
              <AiOutlineUser size={25} className='cursor-pointer' />
            </Link>
        }

        <FiHeart size={25} className='cursor-pointer' />
        <FiShoppingCart size={25} className='cursor-pointer' />
      </div>
    </div>
  )
}

export default Header;
