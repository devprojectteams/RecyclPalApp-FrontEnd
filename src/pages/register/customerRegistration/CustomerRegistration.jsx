// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheckCircle,
//   faEye,
//   faEyeSlash,
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "./CustomerRegistration.css";

// const CustomerRegistration = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [houseNumber, setHouseNumber] = useState("");
//   const [streetName, setStreetName] = useState("");
//   const [city, setCity] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const manageSignUp = async (event) => {
//     event.preventDefault();
//     const apiUrl =
//       process.env.REACT_APP_CUSTOMER_REGISTER_URL ||
//       "http://localhost:8080/api/v1/customer/register";
//     const data = {
//       username: username.trim(),
//       email: email.trim(),
//       password: password.trim(),
//       houseNumber: houseNumber.trim(),
//       streetName: streetName.trim(),
//       city: city.trim(),
//     };

//     // Trimming input values
//     setUsername(username.trim());
//     setEmail(email.trim());
//     setPassword(password.trim());
//     setConfirmPassword(confirmPassword.trim());
//     setHouseNumber(houseNumber.trim());
//     setStreetName(streetName.trim());
//     setCity(city.trim());

//     // Validation: Check email format, password length, and other fields
//     if (validateInputs()) {
//       // Check if passwords match
//       if (password === confirmPassword) {
//         try {
//           const response = await axios.post(apiUrl, data);

//           if (response.data.message === "Email already exists") {
//             errorNotification("Email already exists");
//           } else {
//             successNotification(response.data.message);
//             localStorage.setItem("username", username);
//             navigate("/HomePage");
//           }
//         } catch (error) {
//           if (error.response) {
//             errorNotification(error.response.data.error);
//           } else {
//             console.error(error);
//             errorNotification("An error occurred. Please try again.");
//           }
//         }
//       } else {
//         setConfirmPasswordError("Passwords must match");
//         setTimeout(() => {
//           setConfirmPasswordError("");
//         }, 3000);
//       }
//     }
//   };

//   const validateInputs = () => {
//     // Check required fields
//     if (
//       !username ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !houseNumber ||
//       !streetName ||
//       !city
//     ) {
//       notificationAlert("Please fill in all required fields");
//       return false;
//     }

//     // Check email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       errorNotification("Please enter a valid email address.");
//       return false;
//     }

//     // Check password length
//     if (password.length < 6) {
//       errorNotification("Password must be at least 6 characters.");
//       return false;
//     }

//     return true;
//   };

//   const notificationAlert = (message) => {
//     toast.info(message, {
//       position: "top-center",
//       duration: 3000,
//       theme: "light",
//       icon: <FontAwesomeIcon icon={faCheckCircle} />,
//     });
//   };

//   const successNotification = (message) => {
//     toast.success(message, {
//       duration: 3000,
//       theme: "dark",
//       position: "top-center",
//     });
//   };

//   const errorNotification = (message) => {
//     toast.error(message, {
//       duration: 3000,
//       theme: "light",
//       position: "top-center",
//     });
//   };

//   return (
//     <>
//        <div className="cusRegCustomerSignup-container"> 
//         <div>
//           <h1 className="Cuspageheading">RecyclPal</h1>
//         </div>
//         <div className="Cuscenterform">
//           <form onSubmit={manageSignUp}>
//             <div className="cusRegSignUp-form">
//             <h1 className="Cusformheading">Sign Up As Customer</h1>
//             <hr />
//             <input
//               type="text"
//               className={`CusRegForminput ${
//                 !username.trim() && "invalid-input"
//               }`}
//               name="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               required
//             />{" "}
//             <br /> <br />
//             {!username.trim() && (
//               <div className="CusRegInvalidmessage">
//                 Please fill in your username.
//               </div>
//             )}
//             <input
//               type="text"
//               className={`CusRegForminput ${!email.trim() && "invalid-input"}`}
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email address"
//               required
//             />
//             {!email.trim() && (
//               <div className="CusRegInvalidmessage">
//                 Please fill in your email address.
//               </div>
//             )}
//              <div className="passwordInputContainer">
//             <FontAwesomeIcon
//               icon={passwordVisible ? faEye : faEyeSlash}
//               className="CusRegPasswordIcon"
//               onClick={togglePasswordVisibility}
//             />

//             <input
//               type={passwordVisible ? "text" : "password"}
//               className={`CusRegForminput ${
//                 !password.trim() && "invalid-input"
//               }`}
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//             {!password.trim() && (
//               <div className="cusRegInvalid-message">
//                 Please fill in your password.
//               </div>
//             )}
//           </div>

//           <div className="cusRegPassword-input-container">
//             <FontAwesomeIcon
//               icon={passwordVisible ? faEye : faEyeSlash}
//               className="cusRegPassword-icon"
//               onClick={togglePasswordVisibility}
//             />

//             <input
//               type={passwordVisible ? "text" : "password"}
//               className={`cusRegForm-input ${
//                 (!confirmPassword.trim() || confirmPasswordError) &&
//                 "invalid-input"
//               }`}
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm your password"
//               required
//             />
//             {confirmPasswordError && (
//               <div className="cusRegInvalid-message">Passwords must match.</div>
//             )}
//             {!confirmPassword.trim() && !confirmPasswordError && (
//               <div className="cusRegInvalid-message">
//                 Please confirm your password.
//               </div>
//             )}
//           </div> */}
//             <input
//               type="text"
//               className={`cusRegForm-input ${
//                 !houseNumber.trim() && "invalid-input"
//               }`}
//               name="houseNumber"
//               value={houseNumber}
//               onChange={(e) => setHouseNumber(e.target.value)}
//               placeholder="Enter your House Number"
//               required
//             />
//             {!houseNumber.trim() && (
//               <div className="cusRegInvalid-message">
//                 Please fill in your house number.
//               </div>
//             )}
//             <input
//               type="text"
//               className={`cusRegForm-input ${
//                 !streetName.trim() && "invalid-input"
//               }`}
//               name="streetName"
//               value={streetName}
//               onChange={(e) => setStreetName(e.target.value)}
//               placeholder="Enter your street name"
//               required
//             />
//             {!streetName.trim() && (
//               <div className="cusRegInvalid-message">
//                 Please fill in your street name.
//               </div>
//             )}
//             <input
//               type="text"
//               className={`cusRegForm-input ${!city.trim() && "invalid-input"}`}
//               name="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               placeholder="Enter your city"
//               required
//             />
//             {!city.trim() && (
//               <div className="cusRegInvalid-message">
//                 Please fill in your city.
//               </div>
//             )}
//             <button
//               type="submit"
//               className="cusRegSignUp-button"
//               disabled={
//                 !email.trim() ||
//                 !password.trim() ||
//                 !username.trim() ||
//                 !confirmPassword.trim() ||
//                 !houseNumber.trim() ||
//                 !streetName.trim() ||
//                 !city.trim()
//               }
//             >
//               Sign Up
//             </button>
//             <p className="cusRegLink-to-signIn">
//               Already have an account?{" "}
//               <Link to="/signIn" className="cusRegSignIn-link">
//                 Sign In
//               </Link>
//             </p>
//             </div>
//           </form>
//         </div>
//        </div> 
//     </>
//   );
// };

// export default CustomerRegistration;
