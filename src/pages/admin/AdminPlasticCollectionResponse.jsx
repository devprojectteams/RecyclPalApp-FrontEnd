import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../admin/AdminPlasticCollectionResponse.css";

const AdminPlasticCollectionResponse = () => {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAcceptRecycleRequest = async (requestId) => {
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:8080/api/v1/request/attendToRequest/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);
      setRequests((previousRequests) =>
        previousRequests.filter((request) => request.requestId !== requestId)
      );
      toast.success(
        <div>
          <FontAwesomeIcon icon={faCheckCircle} /> Recycle Request Accepted
        </div>
      );
    } catch (error) {
      setLoading(false);
      console.error("API Post Error:", error);
      toast.error(
        <div>
          <FontAwesomeIcon icon={faTimesCircle} /> Error accepting Recycle
          Request
        </div>
      );
    }
  };

  const fetchRecycledPlasticRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/request/getRequests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRequests(response.data.data);
    } catch (error) {
      console.error("Error loading recycled plastic requests:", error);
      if (error.response && error.response.status === 403) {
        console.error("Unauthorized Access");
      } else {
        toast.error("Error loading recycled plastic requests.");
      }
    }
  };

  useEffect(() => {
    fetchRecycledPlasticRequests();
  }, []);

  return (
    <div className="admin-plastic-collection-response">
      <h2>Recycled Plastic Collection Requests:</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Customer Name</th>
            <th>Customer Phone Number</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests === null ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.requestId}>
                <td>{request.requestId}</td>
                <td>{request.customerName}</td>
                <td>{request.customerPhoneNumber}</td>
                <td>{request.location}</td>
                <td>
                  <button
                    onClick={() =>
                      handleAcceptRecycleRequest(request.requestId)
                    }
                    disabled={loading}
                  >
                    {loading ? "Accepting..." : "Accept"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                No recycled plastic collection requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default AdminPlasticCollectionResponse;
