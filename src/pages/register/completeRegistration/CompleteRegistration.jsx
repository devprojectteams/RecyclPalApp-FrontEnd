import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import "../customerRegistration/validatePhoneNumber ";
import "./CompleteRegistration.css";

const MAX_IMAGE_SIZE = 12; // Define image size limit

const CompleteRegistration = ({ username }) => {
  const [updatedProfileData, setUpdatedProfileData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
  });
  const [file, setFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [validatePhoneNumberError, setValidatePhoneNumberError] = useState("");
  const [imageError, setImageError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const successNotification = (message) => {
    toast.success(message, {
      duration: 3000,
      position: "top-center",
      style: {
        border: "1px solid #00BFA5",
        borderRadius: "15px",
        background: "#B9F6CA",
        color: "#00695C",
      },
    });
  };

  const errorNotification = (message) => {
    toast.error(message, {
      duration: 3000,
      position: "top-center",
      style: {
        border: "1px solid #FF5252",
        borderRadius: "15px",
        background: "#FFD7D7",
        color: "#C62828",
      },
    });
  };

  const validatePhoneNumber = (value) => {
    // Regular expression for phone number validation
    const phoneRegExp = /^\+234\d{10}$/;
    return phoneRegExp.test(value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPhoneNumber", (value) => {
      return validatePhoneNumber(value);
    });
  }, []);

  const valid = Boolean(
    updatedProfileData.firstname &&
      updatedProfileData.lastname &&
      updatedProfileData.phoneNumber
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUpdatedProfileData((prevUpdatedProfileData) => ({
      ...prevUpdatedProfileData,
      [name]: value,
    }));

    if (!validatePhoneNumber(value)) {
      setValidatePhoneNumberError(
        "Phone number should start with +234 followed by PhoneNumber minus the first zero in your number."
      );
    } else {
      setValidatePhoneNumberError("");
    }
  };

  const handleAsyncImageUpload = async (image) => {
    try {
      if (image.size > MAX_IMAGE_SIZE * 1024 * 1024) {
        throw new Error(
          `Image file size should not be more than ${MAX_IMAGE_SIZE}MB.`
        );
      }

      if (!image.type.startsWith("image/")) {
        throw new Error("Only image files are allowed.");
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_cloudinary_preset");
      setImageError("");

      // Upload file to cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Unexpected response from server.");
      }

      const data = await response.json();
      setFile(data.secure_url);
    } catch (error) {
      errorNotification("Image upload failed: " + error.message);
      console.error("Error uploading image:", error);
    }
  };

  const handleFormValidation = () => {
    setIsFormValid(
      updatedProfileData.firstname.trim().length > 0 &&
        updatedProfileData.lastname.trim().length > 0 &&
        validatePhoneNumber(updatedProfileData.phoneNumber)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleFormValidation();

    if (isFormValid && !formSubmitted) {
      setFormSubmitted(true);

      try {
        // Post updated profile data to server
        const response = await fetch(
          `https://api.yourserver.com/v1/customer/completeRegistration/${username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProfileData),
          }
        );

        if (response.ok) {
          successNotification("Profile updated successfully!");
          navigate("/HomePage");
        } else {
          if (response.status >= 400 && response.status <= 499) {
            errorNotification("Invalid request, please try again later.");
          } else if (response.status >= 500 && response.status <= 599) {
            errorNotification("Server error, please try again later.");
          } else {
            errorNotification("Profile update failed. Please try again later.");
          }
        }
      } catch (error) {
        console.error("Error sending Complete Registration Request:", error);
        errorNotification(
          "Error Occurred, Request not successful. Please try again later."
        );
        // } finally {
        //   setFormSubmitted(false);
        // }

        if (file) {
          // If file selected, upload file to server
          await handleAsyncImageUpload(image);
        }
      }
    }
  };

  return (
    <>
      <div className="completeRegistration-request-form">
        <div className="form-title">
          <h1>Complete Registration Details</h1>
        </div>

        <div className="form-containerCompRE">
          <ValidatorForm onSubmit={handleSubmit}>
            <div className="form-group">
              <TextValidator
                type="text"
                name="firstname"
                value={updatedProfileData.firstname}
                onChange={handleInputChange}
                validators={["required"]}
                errorMessages={["Firstname is required"]}
                placeholder="Enter Your Firstname e.g John"
                fullWidth
                required
              />
            </div>

            <div className="form-groupCompRE">
              <TextValidator
                type="text"
                name="lastname"
                value={updatedProfileData.lastname}
                onChange={handleInputChange}
                validators={["required"]}
                errorMessages={["Lastname is required"]}
                placeholder="Enter Your Lastname e.g Doe"
                fullWidth
                required
              />
            </div>

            <div className="form-groupCompRE">
              <TextValidator
                type="tel"
                name="phoneNumber"
                value={updatedProfileData.phoneNumber}
                onChange={handleInputChange}
                validators={["required", "isPhoneNumber"]}
                errorMessages={[
                  "Phone number is required",
                  "Invalid phone number format",
                ]}
                placeholder="Enter Your PhoneNumber e.g +234810***"
                fullWidth
                required
              />
              {validatePhoneNumberError && (
                <span className="error">{validatePhoneNumberError}</span>
              )}
            </div>

            <div className="form-groupCompRE">
              <label htmlFor="image">Upload Image:</label>

              {image ? (
                <div className="preview-image-containerCompRE">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="uploaded img"
                    className="preview-imageCompRE"
                  />
                  <button
                    className="remove-image-buttonCompRE"
                    onClick={() => setImage(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="upload-image-containerCompRE">
                  <div className="upload-image-iconCompRE">
                    <i className="fas fa-cloud-upload-alt"></i>
                  </div>
                  <div className="upload-image-labelCompRE">
                    <p>Upload file</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </div>
              )}
              {imageError && <span className="error">{imageError}</span>}
            </div>

            <div className="button-containerCompRE">
              <button type="submit" disabled={!valid} onClick={handleSubmit}>
                {formSubmitted ? (
                  <div className="loading-spinner-containerCompRE">
                    <div className="loading-spinnerCompRE"></div>
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </ValidatorForm>
        </div>
      </div>
    </>
  );
};
export default CompleteRegistration;
