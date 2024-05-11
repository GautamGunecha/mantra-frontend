import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import AddressForm from "./AddressForm.jsx";
import keys from '../../assets/configs/keys';
import { fetchCurrentUserAsync } from '../../redux/user/reducer'

const AddressesDetails = () => {
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [isApiCallPending, setIsApiCallPending] = useState(false);
  const [message, setMessage] = useState("")

  const { currentUser } = useSelector(state => state.user);
  const { profile } = currentUser;
  const { address } = profile;

  const dispatch = useDispatch();

  useEffect(() => {
    let timeout;
    if (isApiCallPending) {
      // Set a timeout to reset the isApiCallPending state after 2 minutes
      timeout = setTimeout(() => {
        setIsApiCallPending(false);
      }, 2 * 60 * 1000);
    }
    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [isApiCallPending]);

  const handlePrimaryChange = async (index) => {
    if (!isApiCallPending) {
      if (primaryAddress === index) {
        setPrimaryAddress(null);
      } else {
        setPrimaryAddress(index);
        setIsApiCallPending(true);
        // Make your API call here
        try {
          // Your API call logic goes here
          // await makeApiCall(address[index]);
        } catch (error) {
          console.error('Error making API call:', error);
        }
      }
    }
  };

  const handleDelete = async (index) => {
    const url = `${keys.backendUri}/address`;
    const authToken = localStorage.getItem('authToken');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    };

    try {
      const response = await axios.delete(url, {
        headers: headers,
        data: address[index]
      });

      const { success, info } = response.data
      if (success) {
        dispatch(fetchCurrentUserAsync());
        setMessage(info)
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono tracking-widest">
        {address.map((addr, index) => (
          <div key={addr._id} className="bg-white shadow-md p-4 relative">
            <h2 className="text-xl font-bold mb-2">{addr.type}</h2>
            <p className="text-gray-600 mb-1">House Number: {addr.houseNumber}</p>
            <p className="text-gray-600 mb-1">Area: {addr.area}</p>
            <p className="text-gray-600 mb-1">City: {addr.city}</p>
            <p className="text-gray-600 mb-1">State: {addr.state}</p>
            <p className="text-gray-600 mb-1">Country: {addr.country}</p>
            <p className="text-gray-600 mb-1">Pincode: {addr.pincode}</p>
            {addr.landmark && <p className="text-gray-600 mb-1">Landmark: {addr.landmark}</p>}
            {addr.primary && <p className="text-gray-600 mb-1">Delivery Address</p>}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={primaryAddress === index}
                onChange={() => handlePrimaryChange(index)}
                disabled={isApiCallPending}
                className="mr-2"
              />
              <label className="text-gray-600 mr-4">Make it Delivery Address</label>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 border border-red-500 px-2 py-1 rounded-md ml-auto"
              >
                Delete Address
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddressForm />
    </div>
  );
};

export default AddressesDetails;
