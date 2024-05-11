import React, { useState } from 'react'

const AddressForm = () => {
  const [newAddress, setNewAddress] = useState({
    type: '',
    houseNumber: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    landmark: '',
    primary: false // Assuming new addresses are not set as primary by default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset the form fields after submission
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
  };

  return (
    <div className='mt-4'>
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>
        <label className="block mb-2">
          Address Type:
          <select
            name="type"
            value={newAddress.type}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-1 px-2"
            required
          >
            <option value="house">House</option>
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
        {/* Add other address fields similarly */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Add Address
        </button>
      </form>
    </div>

  )
}

export default AddressForm