import React, { useState, useEffect } from 'react';
import axios from 'axios';

import keys from '../../assets/configs/keys';

const WalletDetails = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const url = `${keys.backendUri}/wallet/balance`;
        const authToken = localStorage.getItem('authToken');

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        };

        const response = await axios.get(url, { headers });
        const { success, data } = response.data
        const { wallet } = data

        if (success) {
          setCurrentBalance(wallet.balance);
        }
      } catch (error) {
        setError('Failed to fetch balance');
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleAddMoney = async () => {
    if (amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = `${keys.backendUri}/wallet/add`;
      const authToken = localStorage.getItem('authToken');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };

      const response = await axios.post(url, { balance: parseFloat(amount) }, { headers });
      const { success, data } = response.data

      const { wallet, paymentLink } = data

      if (success) {
        window.location.href = paymentLink
        setCurrentBalance(wallet.balance);
        setAmount('');
      }
    } catch (error) {
      setError('Failed to add money');
      console.error('Error adding money:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-mono tracking-widest'>
      <h1 className='font-semibold'>Wallet Details</h1>

      {/* Current balance */}
      <div className='mt-10'>
        <h1 className=''>Current Balance: Rs {currentBalance}</h1>
      </div>

      {/* Add money */}
      <div className='mt-10'>
        <input
          type='number'
          placeholder='Enter amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='border p-2 rounded'
        />
        <button onClick={handleAddMoney} disabled={loading} className='ml-2 p-2 bg-blue-500 text-white rounded'>
          {loading ? 'Adding...' : 'Add Money'}
        </button>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  );
};

export default WalletDetails;
