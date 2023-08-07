import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const manageSignUp = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/api/v1/customer/register";
    const data = {
      username: username,
      email: email,
      password: password,
    };

    // Validate entered email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      email.trim() !== "" &&
      password.trim() !== "" &&
      username.trim() !== ""
    ) {
      if (email.trim() === "") {
        ErrorNotification("Please enter your email address!");
        return;
      }

      if (!emailRegex.test(email)) {
        ErrorNotification("Please enter a valid email address");
        return;
      }

      if (password.length < 6) {
        ErrorNotification("Password must be at least 6 characters long");
        return;
      }

      if (password !== confirmPassword) {
        ErrorNotification("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post(url, data);
        if (response.data.message === "Email already exists") {
          ErrorNotification("Email already exists");
        } else {
          successNotification(response.data.message);
          localStorage.setItem("username", username);
          navigate("/HomePage");
        }
      } catch (error) {
        if (error.response) {
          ErrorNotification("Invalid details entered.");
        } else {
          console.error(error);
          ErrorNotification("An error occurred. Please try again.");
        }
      }
    } else {
      notificationAlert("Please fill the form correctly!");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const notificationAlert = (message) => {
    toast.info(message, {
      position: "top-center",
      duration: 3000,
      theme: "light",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
    });
  };

  const successNotification = (message) => {
    toast.success(message, {
      duration: 3000,
      theme: "dark",
      position: "top-center",
    });
  };

  const ErrorNotification = (message) => {
    toast.error(message, {
      position: "top-center",
      duration: 3000,
      theme: "light",
    });
  };

  return (
    <div className="new-signup-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <h1 className="page-heading">RecyclPal</h1>
      </div>

      <form onSubmit={manageSignUp}>
        <div className="signUp-form">
          <h1 className="form-heading">Sign Up</h1>
          <hr />

          <input
            type="text"
            className={`form-input ${!username ? "invalid-input" : ""}`}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          {!username && (
            <div className="invalid-message">username cannot be empty</div>
          )}

          <input
            type="text"
            className={`form-input ${!email ? "invalid-input" : ""}`}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address example@gmail.com"
            required
          />
          {!email && (
            <div className="invalid-message">Email cannot be empty</div>
          )}

          <input
            type={passwordVisible ? "text" : "password"}
            className={`form-input ${!password ? "invalid-input" : ""}`}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            className="password-icon"
            onClick={togglePasswordVisibility}
          />
          {!password && (
            <div className="invalid-message">Password cannot be empty</div>
          )}

          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              className={`form-input ${
                !confirmPassword ? "invalid-input" : ""
              }`}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
            {!confirmPassword && (
              <div className="invalid-message">
                Confirm password cannot be empty
              </div>
            )}
          </div>

          <button
            type="submit"
            className="signUp-button"
            disabled={
              !email.trim() ||
              !password.trim() ||
              !username.trim() ||
              !confirmPassword.trim()
            }
            onClick={manageSignUp}
          >
            Sign Up
          </button>

          {/* <Link to="/forgotPassword" className="forgot-password-link">
            Forgot password?
          </Link> */}

          <p className="link-to-signIn">
            Already have an Account{" "}
            <Link to="/signIn" className="signIn-link">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
