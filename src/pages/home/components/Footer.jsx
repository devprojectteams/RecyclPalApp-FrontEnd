import React from 'react';
import "../styles/Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div className='main-height'>
    <div className="FooterContainer">
      
      <div className="FooterContent">
        <ul>
          <li className="footer-item">
            <Link to="/About">About</Link>
          </li>
          <li className="footer-item">
            <Link to="/">Home</Link>
          </li>
          <li className="footer-item">
            <Link to="/Contact">Contact Us</Link>
          </li>
        </ul>
        <p className='p'>© {new Date().getFullYear()} RecyclPal. All rights reserved.</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Footer;
