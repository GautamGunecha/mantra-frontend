import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import keys from '../../assets/configs/keys';
import { useSelector } from 'react-redux';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate();
  const { loggedIn } = useSelector(state => state.user)

  useEffect(() => {
    if (loggedIn) navigate('/')
  }, [loggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const uri = `${keys.backendUri}/auth/forgot/password`
      const headers = {
        'Content-Type': 'application/json',
      };

      const body = { email };
      const response = await axios.post(uri, body, { headers });
      const { success } = response.data

      if (success) {
        setMessage('Email has been sent in order to reset password.')
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='p-16 mb-16 flex justify-center items-center font-mono tracking-widest'>
      <div className='bg-white p-8 shadow-md max-w-md w-full'>
        <h2 className='text-2xl mb-4 text-center'>Forgot Passowrd</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block mb-1 font-medium'>Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
            />
          </div>
          <p className='text-center text-green-500'>{message}</p>
          <button
            type='submit'
            disabled={submitted}
            className='w-full bg-gray-700 text-white py-2 hover:bg-gray-500 transition duration-300'
          >
            Forgot Password.
          </button>
        </form>
        <div className='flex justify-between mt-4'>
          <Link to='/register'>
            <p className='cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>New account</p>
          </Link>
          <Link to='/'>
            <p className='cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>Back to store</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Forgot