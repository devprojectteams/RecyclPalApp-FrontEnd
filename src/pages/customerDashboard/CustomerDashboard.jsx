import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./CustomerDashboard.css";
import Navbar from "../home/components/Navbar";
import Footer from "../home/components/Footer";

const CustomerDashboard = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCustomerDetails = useCallback(async () => {
    try {
      const userDetailsResponse = await axios.get(
        "http://localhost:8080/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCustomerName(userDetailsResponse.data.data.firstname);
      setCustomerPhoneNumber(userDetailsResponse.data.data.phone);
    } catch (error) {
      console.error("Error fetching customer details:", error);
      toast.error(
        <div>
          <FontAwesomeIcon icon={faTimesCircle} /> Error fetching customer
          details
        </div>
      );
    }
  }, []);

  const fetchPickupRequests = useCallback(async () => {
    try {
      const requestsResponse = await axios.get(
        "http://localhost:8080/api/v1/request/getCustomerRequests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPickupRequests(requestsResponse.data.data);
      setLoading(false);

      toast.success(
        <div>
          <FontAwesomeIcon icon={faCheckCircle} /> Recyclable plastic request
          submitted successfully
        </div>,
        { autoClose: 3000 }
      );
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        console.error("Unauthorized Access");
      } else {
        console.error("Error fetching customer requests:", error);
        toast.error(
          <div>
            <FontAwesomeIcon icon={faTimesCircle} /> Error fetching customer
            requests
          </div>
        );
      }
    }
  }, []);

  useEffect(() => {
    fetchCustomerDetails();
    fetchPickupRequests();
  }, [fetchCustomerDetails, fetchPickupRequests]);

  const handleRequestSubmit = async (event) => {
    event.preventDefault();
    const location = event.target.location.value;

    try {
      await axios.post(
        "http://localhost:8080/api/v1/request/createRequest",
        {
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(
        <div>
          <FontAwesomeIcon icon={faCheckCircle} /> Recyclable plastic request
          submitted successfully
        </div>,
        { autoClose: 3000 }
      );

      fetchPickupRequests();
    } catch (error) {
      console.error("Error submitting recyclable plastic request:", error);
      toast.error(
        <div>
          <FontAwesomeIcon icon={faTimesCircle} /> Error submitting recyclable
          plastic request
        </div>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h3>Customer Dashboard</h3>
        <h4>Recyclable Plastic Pickup Requests</h4>
        {loading ? (
          <p>Loading...</p>
        ) : pickupRequests.length > 0 ? (
          pickupRequests.map((request) => (
            <div key={request.requestId} className="request-card">
              <div className="request-card-left">
                <h5>Request ID: {request.requestId}</h5>
                <p>Status: {request.status}</p>
                <p>Location: {request.location}</p>
              </div>
              <div className="request-card-right">
                <p>Customer: {request.customerName}</p>
                <p>Phone Number: {request.customerPhoneNumber}</p>
                <p>Response: {request.response || "N/A"}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No recyclable plastic pickup requests found.</p>
        )}

        <h4>Submit New Request</h4>

        <form onSubmit={handleRequestSubmit} className="request-form">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={customerName}
            required
            disabled
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customerPhoneNumber}
            required
            disabled
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter pickup location"
            required
          />

          <button type="submit">Submit Request</button>
        </form>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CustomerDashboard;
