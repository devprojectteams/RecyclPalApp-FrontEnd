import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const successNotification = (message) => {
    toast.success(message, {
      position: 'top-center',
      duration: 2000,
      theme: 'light',
    });
  };

  const ErrorNotification = (error) => {
    toast.error(error, {
      position: 'top-center',
      duration: 3000,
      theme: 'light',
    });
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const URL = 'http://localhost:8080/api/v1/forgot-password';
    const data = {
      email,
    };

    // Validate entered email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      ErrorNotification('Please enter your email address!');
      return;
    } else if (!emailRegex.test(email)) {
      ErrorNotification('Please enter a valid email address');
      return;
    } else {
      try {
        const response = await axios.post(URL, data);
        if (response.status >= 200 && response.status < 300) {
          successNotification(response.data.message);
          navigate('/home');
        } else {
          ErrorNotification('An error occurred. Please try again.');
        }
      } catch (error) {
        if (error.response) {
          ErrorNotification(error.response.data.message);
        } else {
          console.error(error);
          ErrorNotification('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div className="forgotPassword-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <h1 className="page-heading">RecyclPal</h1>
      </div>

      <div className="forgotPassword-form">
        <h1 className="form-heading">Forgot Password</h1>
        <hr />

        <form onSubmit={handleForgotPassword}>
          <input
            type="text"
            className={`form-input ${!email && 'invalid-input'}`}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address example@gmail.com"
            required
          />
          {!email && <div className="invalid-message">Email cannot be empty</div>}

          <button type="submit" className="forgotPassword-button">
            Reset Password
          </button>

          <div className="link-to-signIn">
            <p>
              Remembered your password?{' '}
              <Link to="/signIn" className="signIn-link">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;