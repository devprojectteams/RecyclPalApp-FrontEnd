import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/components/Navbar";
import { email as isEmailValid } from "validator";
import { Input, TextareaAutosize, Button } from "@mui/material";
// import { Input, TextareaAutosize, Button } from "@material-ui/core";



const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const successNotification = (message) => {
    toast.success(message, {
      duration: 3000,
      theme: "dark",
      position: "top-center",
    });
  };

  const errorNotification = (message) => {
    toast.error(message, {
      position: "top-center",
      duration: 3000,
      theme: "light",
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      formValid = false;
    }

    if (!isEmailValid(formData.email)) {
      newErrors.email = "Invalid email address";
      formValid = false;
    }

    // Regular expression for validating Nigerian phone numbers
    const phoneNumberRegex = /^(\+?234|0)[789]\d{9}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (e.g., +234 81XXX)";
      formValid = false;
        setErrors(newErrors);
    }

    if (formData.message.trim().split(/\s+/).length > 500) {
      newErrors.message = "Message should be limited to 500 words";
      formValid = false;
      
    }

    if (formValid) {
      axios
        .post("http://localhost:8080/api/v1/contactUs", formData)
        .then((response) => {
          console.log("Form data sent successfully!", response.data);
          successNotification("Form data sent successfully!");
          navigate("/HomePage");
        })
        .catch((error) => {
          console.error("Error sending form data:", error);
          errorNotification("Error sending form data");
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="contact">
      <Navbar />
      <h1>Contact Us</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name e.g John Doe"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email e.g example@gmail.com"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+234 81XXX"
              inputProps={{
                pattern: "(\\+?234|0)[789]\\d{9}",
              }}
              fullWidth
              required
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <TextareaAutosize
              name="message"
              rowsMin={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type Your Message Here"
              required
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} RecyclPal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
