import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='p-16 mb-16 flex justify-center items-center font-mono tracking-widest'>
      <div className='bg-white p-8 shadow-md max-w-md w-full'>
        <h2 className='text-2xl mb-4 text-center'>Register</h2>
        <form className='space-y-4'>
          <div>
            <label className='block mb-1 font-medium'>First Name</label>
            <input
              type='text'
              placeholder='Enter your first name'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>Last Name</label>
            <input
              type='text'
              placeholder='Enter your last name'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-gray-700 text-white py-2 hover:bg-gray-500 transition duration-300'
          >
            Register
          </button>
        </form>
        <div className='flex justify-between mt-4'>
          <Link to='/login'>
            <p className='cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>Login</p>
          </Link>
          <Link to='/'>
            <p className='cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>Return to store</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register