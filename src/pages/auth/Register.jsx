import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import keys from '../../assets/configs/keys'
import { useSelector } from 'react-redux'

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false)

  const { loggedIn } = useSelector(state => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate('/')
  }, [loggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const uri = `${keys.backendUri}/auth/register`
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = { firstName, lastName, email, password }

      const response = await axios.post(uri, body, { headers })
      const { success, info } = response.data;

      if (success) {
        setMessage(info)
        clearFormData()
      }
    } catch (error) {
      console.error('error', error.response.data.info);
      setSubmitted(false);
      setMessage(error.response.data.info);
    } finally {
      setSubmitted(false)
    }
  };

  const clearFormData = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  };

  return (
    <div className='p-16 mb-16 flex justify-center items-center font-mono tracking-widest'>
      <div className='bg-white p-8 shadow-md max-w-md w-full'>
        <h2 className='text-2xl mb-4 text-center'>Register</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block mb-1 font-medium'>First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              placeholder='Enter your first name'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              placeholder='Enter your last name'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500'
              required
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
              required
            />
          </div>
          <button
            type='submit'
            disabled={submitted}
            className='w-full bg-gray-700 text-white py-2 hover:bg-gray-500 transition duration-300'
          >
            Register
          </button>
        </form>
        <div className='mt-4 text-center text-green-500'>
          <p>{message}</p>
        </div>
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