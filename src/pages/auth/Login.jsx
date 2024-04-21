import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import keys from '../../assets/configs/keys'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitted(true);

    try {
      const uri = `${keys.backendUri}/api/auth/register`
      const headers = {
        'Content-Type': 'application/json',
      };
      
      const body = { email, password }
      await axios.post(uri, body, { headers });
    } catch (error) {
      setSubmitted(false)
      console.error(error.message)
    }
  }

  return (
    <div className='p-16 mb-16 flex justify-center items-center font-mono tracking-widest'>
      <div className='bg-white p-8 shadow-md max-w-md w-full'>
        <h2 className='text-2xl mb-4 text-center'>Login</h2>
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
          <div>
            <label className='block mb-1 font-medium'>Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
            />
          </div>
          <button
            type='submit'
            disabled={submitted}
            className='w-full bg-gray-700 text-white py-2 hover:bg-gray-500 transition duration-300'
          >
            Login
          </button>
        </form>
        <div className='flex justify-between mt-4'>
          <Link to='/register'>
            <p className='cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>New account</p>
          </Link>
          <Link to='/forgot'>
            <p className='cursor-pointer mb-2 transition-all duration-300 ease-in-out hover:underline'>Forgot password</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
