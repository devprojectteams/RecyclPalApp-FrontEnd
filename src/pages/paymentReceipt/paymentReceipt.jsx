import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./paymentReceipt.css";
import { jsPDF } from "jspdf";

const PaymentReceipt = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("api/v1/receivePayment", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setData(data[0]);
        toast.success("Data fetched successfully");
      } else {
        setData(null);
        toast.warn("No payment data found.");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching data");
    }
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();

    // Add receipt to pdf
    doc.setFontSize(20);
    doc.text("Payment Receipt", 10, 20);
    doc.setFontSize(12);
    doc.text("Transaction ID: " + data.transactionId, 10, 40);
    doc.text("Receipt ID: " + data.receiptId, 10, 50);
    doc.text("Payment Status: " + data.paymentStatus, 10, 60);
    doc.text("Sender: " + data.sender, 10, 70);
    doc.text("Receiver: " + data.receiver, 10, 80);
    doc.text("Amount: " + data.amount, 10, 90);

    // Save pdf
    doc.save("payment-receipt.pdf");
  };

  const handleSavePayment = async (paymentData) => {
    try {
      setLoading(true);
      // Implement the logic to save the payment data here.
      // You can make an API call to save the payment data on the server.
      setLoading(false);
      toast.success("Payment saved successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Error saving payment");
    }
  };

  return (
    <div className="payment-receipt">
      <h2 className="title">Payment Receipt</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul className="list">
          <li key={data?.receiptId || ""} className="item">
            <p>
              <span className="field">Transaction ID:</span>{" "}
              {data?.transactionId || "N/A"}
            </p>
            <p>
              <span className="field">Receipt ID:</span>{" "}
              {data?.receiptId || "N/A"}
            </p>
            <p>
              <span className="field">Payment Status:</span>{" "}
              {data?.paymentStatus || "N/A"}
            </p>
            <p>
              <span className="field">Sender:</span> {data?.sender || "N/A"}
            </p>
            <p>
              <span className="field">Receiver:</span> {data?.receiver || "N/A"}
            </p>
            <p>
              <span className="field">Amount:</span> {data?.amount || "N/A"}
            </p>
          </li>
        </ul>
      )}

      <div className="actions">
        {data !== null && (
          <>
            <button className="btn-export-pdf" onClick={handleExportPdf}>
              Export as PDF
            </button>
            <button
              className="btn-save-payment"
              onClick={() => handleSavePayment(data)}
            >
              Save Payment
            </button>
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default PaymentReceipt;
