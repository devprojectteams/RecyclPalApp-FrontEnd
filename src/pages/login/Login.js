import React, { useState } from 'react';
import { LoginUserAccount } from '../../component/externalAPIs/FetchUserAccount';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState('')

  const handlebutton =()=>{
    const data ={
      email,
      password
    }
    const url = fetch('')
    .post(url,data)
    .then((res)=>{
      return res.data})
    
  }


  const login = async () => {
    try {
      const response = await LoginUserAccount(user);
      if (response.status === 200) {
        toast.success('Login Successful!');
        localStorage.setItem('token', response.data.access_token);
        window.location.href = '/home';
      } else {
        toast.error('Invalid Login Details, Please Enter Your Correct Details.');
      }
    } catch (error) {
      toast.error('Incorrect login details entered');
    }
  };

  return (
    <div className="login-container">
      <div>
        <h1 className="page-heading">RecyclPal</h1>
      </div>
      <div className="login-form">
        <h1 className="form-heading">Login</h1>
        <hr />
        <input
          type="text"
          className="form-input"
          name="email"
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter your Email address"
        />
        <input
          type="password"
          className="form-input"
          name="password"
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Enter your Password"
        />
        <button onClick={login} className="login-button">
          Login
        </button>
        <a href="/register" className="register-link">
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
}

export default Login;
