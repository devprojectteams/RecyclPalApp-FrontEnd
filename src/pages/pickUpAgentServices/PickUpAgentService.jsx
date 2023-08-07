import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./PickUpAgentService.css";
import Footer from "../home/components/Footer";
import Navbar from "../home/components/Navbar";

const PickUpAgentService = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isPickuped, setIsPickuped] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const handleAction = async (accepted, pickuped) => {
    const objectToBackend = {
      isAccepted: accepted,
      isPickuped: pickuped,
    /*   isDeclined,Declined,*/
    };

    try {
      const response = await fetch("api/v1/confirmPlasticRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objectToBackend),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${accepted ? "accept" : "decline"} request`);
      }

      if (accepted) {
        setIsAccepted(true);
        setIsPickuped(false);
        setIsDeclined(false);
        toast.success("Request accepted successfully");
      } else {
        setIsDeclined(true);
        setIsAccepted(false);
        setIsPickuped(false);
        toast.error("Request declined");
      }
    } catch (error) {
      setIsAccepted(false);
      setIsPickuped(false);
      setIsDeclined(false);
      toast.error(`Error ${accepted ? "accepting" : "declining"} request`);
    }
  };

  return (
    <>
    <Navbar />
    <div className="recyclpal-pickup-agent">
      <h1>Confirm Recyclable Plastics Request</h1>
      {!isAccepted && !isDeclined && (
        <div>
          <p>Do you want to accept or decline the request?</p>
          <label>
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
              disabled={isDeclined}
            />
            Accept
          </label>
          <label>
            <input
              type="checkbox"
              checked={isDeclined}
              onChange={() => setIsDeclined(!isDeclined)}
              disabled={isAccepted}
            />
            Decline
          </label>
          <button
            onClick={() => handleAction(isAccepted, false)}
            disabled={!isAccepted && !isDeclined}
          >
            Confirm Decision
          </button>
          {isDeclined && !isAccepted && (
            <p>
              If you want to make a new recycle request,{" "}
              <Link to="/recycle-request">click here</Link>.
            </p>
          )}
        </div>
      )}
      {isAccepted && !isPickuped && (
        <button onClick={() => handleAction(true, true)}>
          Plastic is Picked For Recycling
        </button>
      )}
      {isPickuped && (
        <button disabled className="picked">
          Plastic is Picked For Recycling
        </button>
      )}
      <ToastContainer />
    </div>
    <Footer />
    </>
  );
};

export default PickUpAgentService;
