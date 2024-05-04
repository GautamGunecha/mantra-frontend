import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import keys from '../../assets/configs/keys';

const ProfileDetails = () => {
  const { currentUser } = useSelector(state => state.user);

  const [firstName, setFirstName] = useState(currentUser.profile.firstName)
  const [lastName, setLastName] = useState(currentUser.profile.lastName)
  const [email, setEmail] = useState(currentUser.email)
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState(currentUser?.profile?.phone || '')
  const [dob, setDob] = useState(currentUser?.profile?.dateOfBirth ? new Date(currentUser.profile.dateOfBirth) : '');
  const [gender, setGender] = useState("male")
  const [countryCode, setCountryCode] = useState('91')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${keys.backendUri}/profile`;
      const authToken = localStorage.getItem('authToken');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };

      const body = {
        firstName,
        lastName,
        email,
        password,
        countryCode,
        phone,
        dateOfBirth: dob,
        gender
      }

      const response = await axios.put(url, body, { headers })
      const { success, info, data } = response.data

      if (success) {
        setMessage(info)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='font-mono tracking-widest w-[95%]'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl mb-4'>Personal Information</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consequuntur, iusto magni quis tempore culpa asperiores? Culpa adipisci dicta tenetur. Reiciendis ab dolorem, inventore praesentium sed corrupti libero nihil.</p>
      </div>

      <p className='text-center mb-4 font-bold text-green-400'>{message}</p>

      <form onSubmit={handleSubmit} className="max-w-full">
        <div className="mb-6 flex justify-between">
          <div className="w-1/2 mr-2">
            <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              type='text' id="firstName" name="firstName" className="mt-1 w-full p-2 border-gray-300" />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="lastName" className="block mb-2 font-medium">Last Name</label>
            <input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              type='text' id="lastName" name="lastName" className="mt-1 block w-full p-2 border-gray-300 " />
          </div>
        </div>

        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email' id="email" name="email" className="mt-1 block w-full p-2 border-gray-300 " />

        <label htmlFor="password" className="block mb-1 font-medium mt-4">Update Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter new password.'
          type='password' id="password" name="password" className="mt-1 block w-full p-2 border-gray-300 " />

        <label htmlFor="dob" className="block mb-1 font-medium mt-4">Date of Birth</label>
        <input
          value={dob ? dob.toISOString().split('T')[0] : ''}
          onChange={e => setDob(new Date(e.target.value))}
          type='date' id="dob" name="dob" className="mt-1 block w-full p-2 border-gray-300 " />

        <label htmlFor="phone" className="block mb-1 font-medium mt-4">Phone Number</label>
        <div className="flex">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            name="countryCode" id="countryCode" className="mt-1 block w-1/3 p-2 border-gray-300  mr-2">
            <option value="+91">India (+91)</option>
            <option value="+1">United States (+1)</option>
          </select>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder='Enter primary phone number.'
            type='text' id="phone" name="phone" className="mt-1 block w-2/3 p-2 border-gray-300 " />
        </div>

        <label htmlFor="gender" className="block mb-1 font-medium mt-4">Gender</label>
        <select
          value={gender}
          onChange={e => setGender(e.target.value)} name="gender" id="gender" className="mt-1 block w-full p-2 border-gray-300 ">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit" className="w-full bg-gray-700 text-white py-2 hover:bg-gray-500 transition duration-300 mt-4">
          Update
        </button>
      </form>
    </div>
  )
}

export default ProfileDetails;
