import React from 'react';
import recyclPalLogo from '../assets/logo.png';
import '../styles/Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  return (
    <div className="nav-cont">
      <img className="logo" src={recyclPalLogo} alt="RecyclPal Logo" />
      <div className="nav-items">
        <a href="/signUp"><i className="fas fa-user"></i> SignUp</a>
        <a href="/"><i className="fas fa-home"></i> Home</a>
        <a href="/"><i className="fas fa-info-circle"></i> About</a>
        <a href="/"><i className="fas fa-box-open"></i> Services</a>
        <a href="/"><i className="fas fa-envelope"></i> Contact</a>
      </div>
    </div>
  );
};

export default Navbar;


















// import React from 'react';
// import recyclPalLogo from '../assets/logo.png';
// import "../styles/Navbar.css";

// const Navbar = () => {
//   return (
//     <>
//     <div className="nav-cont">
//           <img className="logo" src={recyclPalLogo}  alt="RecyclPal Logo" />
//           <div className="nav-item"><a href="/signUp">SignUp</a></div>
//           <div className="nav-item"><a href="/">Home</a></div>
//           <div className="nav-item"><a href="/">About</a></div>
//           <div className="nav-item"><a href="/">Services</a></div>
//           <div className="nav-item"><a href="/">Contact</a></div>
//     </div>
//     </>
//   );
// };

// export default Navbar;
