import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'

import keys from '../../assets/configs/keys';
import { fetchCurrentUserAsync } from '../../redux/user/reducer'

const AddressForm = () => {
  const [message, setMessage] = useState("")
  const [errorInfo, setErrorInfo] = useState("")
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    houseNumber: '',
    area: '',
    city: '',
    state: '',
    country: 'india',
    pincode: '',
    landmark: '',
    primary: false // Assuming new addresses are not set as primary by default
  });

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${keys.backendUri}/address`
      const authToken = localStorage.getItem('authToken');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };

      const response = await axios.post(url, newAddress, { headers })
      const { success, info } = response.data

      if (success) {
        setMessage(info)

        setNewAddress({
          type: '',
          houseNumber: '',
          area: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          landmark: '',
          primary: false
        });

        dispatch(fetchCurrentUserAsync());
      }
    } catch (error) {
      setErrorInfo(error.response.data.info)
    }
  };

  return (
    <div className='mt-4 font-mono tracking-widest'>
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>
        <h2 className='mb-4 text-center text-red-500'>{errorInfo}</h2>
        <h2 className='mb-4 text-center text-green-500'>{message}</h2>
        <label className="block mb-2">
          Address Type:
          <select
            name="type"
            value={newAddress.type}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          >
            <option value="home">Home</option>
            <option value="office">Office</option>
          </select>
        </label>
        <label className="block mb-2">
          House Number:
          <input
            type="text"
            name="houseNumber"
            value={newAddress.houseNumber}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          />
        </label>

        <label className="block mb-2">
          Area:
          <input
            type="text"
            name="area"
            value={newAddress.area}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          />
        </label>

        <label className="block mb-2">
          Landmark:
          <input
            type="text"
            name="landmark"
            value={newAddress.landmark}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          />
        </label>

        <label className="block mb-2">
          City:
          <input
            type="text"
            name="city"
            value={newAddress.city}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          />
        </label>

        <label className="block mb-2">
          State:
          <input
            type="text"
            name="state"
            value={newAddress.state}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          />
        </label>

        <label className="block mb-2">
          Pincode:
          <input
            type="text"
            name="pincode"
            value={newAddress.pincode}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          />
        </label>

        <label className="block mb-2">
          country:
          <select
            name="country"
            value={newAddress.country}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          >
            <option value="india">India</option>
          </select>
        </label>

        <label className="block mb-2">
          Primary Address:
          <select
            name="primary"
            value={newAddress.primary}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Add Address
        </button>
      </form>
    </div>

  )
}

export default AddressForm