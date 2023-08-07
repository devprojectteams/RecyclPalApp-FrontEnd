import React,{useState} from "react";
import "./GetStarted.css";
import Navbar from "../home/components/Navbar";
import Footer from "../home/components/Footer";

const GetStarted = () => {
  const[isOpen, setIsOpen] =useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar />
      {/* <div>
        <div className="navbar">
          <div className="logo">
            <h1>RecyclPal</h1>
          </div>
          <ul className="nav-links">
            <li className="nav-item">
              <a href="/signUp">SignUp</a>
            </li>
            <li className="nav-item">
              <a href="/">Home</a>
            </li>
            <li className="nav-item">About</li>
            <li className="nav-item">Services</li>
            <li className="nav-item">Contact</li>
          </ul>
        </div> */}

      <div className="getStartedBody">
        <section className="home-section">
          <h1>Welcome to RecyclPal</h1>
          <p>The Continent's No 1 Recycling Solution WebApp</p>

          {/* <button className="cta-button">
            <Link to="/SignIn">Get Started</Link>
          </button> */}
          <div className="cta-button">
            <button className="dropdown-btn" onClick={toggleDropdown}>
              <h2>Get Started</h2>
            </button>
            {isOpen && (
              <div className="dropdown-content">
                {/* <a href="/RecycleCompanyRegisteration ">
                  Sign Up As A Recycling Company
                </a> */}
                
                <a href="/CustomerRegisteration ">
                  <h4>Sign Up</h4>
                </a>
               
                <a href="/PlasticCollectionAgentSignUp ">
                  <h4>Sign Up As Plastic Collection Agent</h4>
                </a>
               
                <a href="/signin">
                  <h4>Sign In</h4>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* </div> */}
        <Footer />
      </div>
      {/* <footer className="footer">
        <p>© {new Date().getFullYear()} RecyclPal. All rights reserved.</p>
      </footer> */}
    </>
  );
};

export default GetStarted;
