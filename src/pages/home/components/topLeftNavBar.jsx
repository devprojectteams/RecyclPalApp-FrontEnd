// import React from 'react';
// import recyclPalLogo from '../assets/logo.png';
// import { useNavigate } from 'react-router-dom';
// import '../styles/TopLeftNavBar.css'; // Import the CSS file

// const TopLeftNavBar = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="top-nav-container">
//       <div className="top-nav">
//         <img
//           src={recyclPalLogo}
//           className="logo"
//           alt="RecyclPal Logo"
//           onClick={() => {
//             navigate('/home');
//           }}
//         />
//         <div className="dropdown">
//           <button className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
//             <span className="dropdown-icon">&#x25BC;</span>
//           </button>
//           <div className="dropdown-menu" role="menu" aria-hidden="true">
//             <button className="dropdown-option">Option 1</button>
//             <button className="dropdown-option">Option 2</button>
//             <button className="dropdown-option">Option 3</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default TopLeftNavBar;
























import React from 'react';
import recyclPalLogo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimary, ButtonSecondary } from './Button'; // Adjust the import here
import '../styles/TopLeftNavBar.css';
import Navbar from './Navbar';
import Footer from './Footer';

const TopLeftNavBar = () => {
  const navigate = useNavigate();

  
  return (
 
    <div className='mainContainer'>
         <div>  <Navbar />
    <nav className="top-nav-">
      <div className="top-nav ">
     
        <img
          src={recyclPalLogo}
          className="logo"
          alt="RecyclPal Logo"
          onClick={() => {
            navigate('/home');
          }}
        />
        <div className="dropdown">
          <button className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
            <span className="dropdown-icon">&#x25BC;</span>
          </button>
          <div className="dropdown-menu" role="menu" aria-hidden="true">
            <button className="dropdown-option">Option 1</button>
            <button className="dropdown-option">Option 2</button>
            <button className="dropdown-option">Option 3</button>
            <ButtonPrimary>Click me!</ButtonPrimary>
          </div>
        </div>
        <div className='body'></div>
      </div>
    
    </nav>
    </div>
    
     </div>
  );
};

export default TopLeftNavBar;
