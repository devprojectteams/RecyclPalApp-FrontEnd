import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EcoPalDashboard.css";
import Navbar from "../home/components/Navbar";
import Footer from "../home/components/Footer";

const EcoPalDashboard = () => {
  const [data, setData] = useState([{}]);
  //   const [backend, setBackEnd] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("api/v1/ecopalDashboard", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data || {}); // Initialize data as an empty object if null
      setLoading(false);
      toast.success("Data fetched successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching data");
    }
  };

  return (
    <>
      <Navbar />

      <div className="ecopal-dashboard">
        <h2 className="title">EcoPal Dashboard</h2>
        {!data === [] &&
          data.map((item) => (
            <div key={item.id}>
              <p>{item}</p>
            </div>
          ))}
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            {Object.keys(data).length > 0 ? (
              <>
                <p>Username: {data.username}</p>
                <p>Total Point Gained: {data.totalPointGained}</p>
                <p>Point Balance: {data.pointBalance}</p>
              </>
            ) : (
              <p>
                Data is null. Please check your connection and try again later.
              </p>
            )}
          </>
        )}
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default EcoPalDashboard;
