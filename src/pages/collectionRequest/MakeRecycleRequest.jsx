import React, { useState, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MAX_IMAGE_SIZE = 12; // Define image size limit

const MakeRecycleRequest = () => {
  const [formData, setFormData] = useState({
    // fullName: "",
    // phoneNumber: "",
    // email: "",
    locationAddress: "",
    recyclablePlasticRequest: "",
    collectionRequestDate: "",
  });

  const [file, setFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
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

  const validateEmail = (value) => {
    // Regular expression for email validation
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegExp.test(value);
  };

  const validatePhoneNumber = (value) => {
    // Regular expression for phone number validation
    const phoneRegExp = /^\+\d{1,3}\s\d{10}$/;
    return phoneRegExp.test(value);
  };

  // const { fullName, phoneNumber, email, locationAddress, recyclablePlasticRequest, collectionRequestDate } = formData;

  // Upload file to cloudinary
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('upload_preset', 'your_cloudinary_preset');

  const valuesToBeSent = {
    fullName: formData.fullName,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    recyclablePlasticRequest: formData.recyclablePlasticRequest,
    collectionRequestDate: formData.collectionRequestDate,
    // imageUrl,
  };

  // add the name and preset for cloudinary.
  fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.secure_url;

      // Send the request data to the API endpoint
      fetch("our_api_endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valuesToBeSent,
        }),
      })
        .then((response) => {
          if (response.status >= 400 && response.status <= 499) {
            throw new Error("Request failed, Bad Request"); // client side error
          } else if (response.status >= 500 && response.status <= 599) {
            throw new Error("Server Down"); // server  soride  err
          }
          return response.json();
        })
        .then((data) => {
          console.log("Recyclable Plastic Request sent successfully!", data);
          successNotification("Recyclable Plastic Request sent successfully!");
          navigate("/HomePage");
        })
        .catch((error) => {
          console.error("Error sending Recyclable Plastic Request:", error);
          errorNotification("Error Occurred, Request not successful.");
        });
    })
    .catch((error) => {
      console.error("Error uploading file", error);
      errorNotification("Error Occurred: File not uploaded.");
    });
  // Add validation rules for the form
  // useEffect(() => {
  //   ValidatorForm.addValidationRule("isPhoneNumber", validatePhoneNumber);
  //   ValidatorForm.addValidationRule("isEmail", validateEmail);
  // }, []);

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    const threeYearsFromNow = new Date();
    threeYearsFromNow.setFullYear(threeYearsFromNow.getFullYear() + 3);

    if (selectedDate < currentDate) {
      setError("Invalid date: Date cannot be in the past");
      return false;
    } else if (selectedDate > threeYearsFromNow) {
      setError(
        "Invalid date: Date cannot be more than three years from current date"
      );
      return false;
    } else if (
      selectedDate.getFullYear() === currentDate.getFullYear() &&
      selectedDate.getMonth() !== currentDate.getMonth()
    ) {
      setDateError("Invalid date: Date must be within the current month");
      return false;
    } else {
      setDateError("");
      return true;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "collectionRequestDate" && !validateDate(value)) {
      setDateError(
        "Collection request date should be today or a future date within the next 3 years."
      );
    } else {
      setDateError("");
    }
  };

  const handleAsyncImageUpload = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_cloudinary_preset");
      setImageError("");

      // Upload file to cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the file size and type are valid
      if (image.size > MAX_IMAGE_SIZE * 1024 * 1024) {
        throw new Error(
          `Image file size should not be more than ${MAX_IMAGE_SIZE}MB.`
        );
      }
      if (!image.type.startsWith("image/")) {
        throw new Error("Only image files are allowed.");
      }

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Unexpected response from server.");
      }

      const data = await response.json();
      setFile(data.secure_url);
    } catch (error) {
      errorNotification("Image upload failed: " + error.message);
    }
  };

  const handleFormValidation = () => {
    const {
      fullName,
      phoneNumber,
      email,
      locationAddress,
      recyclablePlasticRequest,
      collectionRequestDate,
    } = formData;
    setIsFormValid(
      fullName.trim().length > 0 &&
        ValidatorForm.hasValidationRule("isPhoneNumber", phoneNumber) &&
        ValidatorForm.hasValidationRule("isEmail", email) &&
        locationAddress.trim().length > 0 &&
        recyclablePlasticRequest.trim().length > 0 &&
        file &&
        validateDate(collectionRequestDate)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleFormValidation();

    if (isFormValid && !formSubmitted) {
      try {
        setFormSubmitted(true);
        successNotification("Recyclable Plastic Request sent successfully!");
        navigate("/HomePage");
      } catch (error) {
        console.error("Error sending Recyclable Plastic Request:", error);
        errorNotification("Error Occurred, Request not successful.");
      }
    }
  };

  return (
    <>
      <div className="collection-request-form">
        <div className="form-title">
          <h1>Plastic Recyclable Bin Collection Request</h1>
        </div>

        <div className="form-container">
          <ValidatorForm onSubmit={handleSubmit}>
            <div className="form-group">
              <TextValidator
                type="text"
                // name="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                validators={["required"]}
                errorMessages={["Fullname is required"]}
                placeholder="Enter Your Fullname e.g John Doe"
                fullWidth
                required
              />
            </div>

            <div className="form-group">
              <TextValidator
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                validators={["required", "isPhoneNumber"]}
                errorMessages={[
                  "Phone number is required",
                  "Invalid phone number format",
                ]}
                placeholder="Enter Your PhoneNumber e.g +234 810***"
                fullWidth
                required
              />
            </div>

            <div className="form-group">
              <TextValidator
                type="email"
                // name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                validators={["required", "isEmail"]}
                errorMessages={["Email is required", "Invalid email format"]}
                placeholder="Enter Your Email example@gmail.com"
                fullWidth
                required
              />
            </div>

            <div className="form-group">
              <TextValidator
                type="text"
                // name="locationAddress"
                value={formData.locationAddress}
                onChange={(e) =>
                  setFormData({ ...formData, locationAddress: e.target.value })
                }
                validators={["required"]}
                errorMessages={["Address is required"]}
                placeholder="Enter the address location of the Plastics"
                fullWidth
                required
              />
            </div>

            <div className="form-group">
              <TextValidator
                type="text"
                // name="recyclablePlasticRequest"
                value={formData.recyclablePlasticRequest}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recyclablePlasticRequest: e.target.value,
                  })
                }
                validators={["required"]}
                errorMessages={["Recyclable Plastic Request is required"]}
                placeholder="Your Recycle Request Here, List Recyclable Plastic Items You Want To Recycle"
                rows="5"
                multiline
                fullWidth
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Upload Image:</label>
              {image ? (
                <div style={{ width: "200px", height: "150px" }}>
                  {/* <img
                    src={image}
                    alt="img"
                    style={{ width: "100%", height: "100%" }}
                  /> */}
                  <img
                    src={URL.createObjectURL(image)}
                    alt="img"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ) : (
                <input
                  type="file"
                  name="image"
                  id="file"
                  accept="image/*"
                  onChange={(event) => setImage(event.target.files[0])}
                />
              )}
              {imageError && <span className="error">{imageError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="collectionRequestDate">
                Collection Request Date:
              </label>
              <input
                type="date"
                name="collectionRequestDate"
                id="collectionRequestDate"
                value={formData.collectionRequestDate}
                onChange={handleInputChange}
                required
              />
              {dateError && <span className="error">{dateError}</span>}
            </div>

            <button type="submit" disabled={!isFormValid || formSubmitted}>
              {formSubmitted ? "Submitting..." : "Submit"}
            </button>
          </ValidatorForm>
        </div>
      </div>
    </>
  );
};

export default MakeRecycleRequest;
