import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import keys from '../../assets/configs/keys';

const EmailValidation = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const uri = `${keys.backendUri}/auth/validate/user`
        const headers = {
          'Content-Type': 'application/json',
        };

        const body = { token }
        const response = await axios.post(uri, body, { headers })
        const { success } = response.data

        if (success) {
          setMessage('Email verification completed successfully. Redirecting to login page.');
          setErrorMessage("");
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        setErrorMessage(error.response.data.info || "Invalid request try after sometime.");
        setMessage("")
      }
    };

    validateToken();
  }, [token, navigate]);

  return (
    <div className='font-mono tracking-widest text-center mt-20 mb-96'>
      {errorMessage && (
        <p className="text-red-600">{errorMessage}</p>
      )}
      {message && (
        <p className="text-green-600">{message}</p>
      )}
      {!errorMessage && !message && (
        <p>Process email verification...</p>
      )}
    </div>
  );
};

export default EmailValidation;
