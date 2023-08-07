import React, { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import "./PayStackPayment.css";

  const PayStackPayment = () => {
  const publicKey = "pk_test_70430e7f264e34eb3ed0f026a879a446d36c5c84"; // Replace with your actual public key
  const amountPerPoint = 1; // Amount in Naira per point (adjust as needed)
  const [points, setPoints] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("api/v1/users/{user_id}", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer {access_token}", // Replace with app's access token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setUserDetails(data[0]);
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch user details");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAmount = () => {
    return points * amountPerPoint * 100; // Convert to kobo
  };

  const validateBankAccountNumber = (accountNumber) => {
    const accountNumberRegex = /^[0-9]{10}$/;
    return accountNumberRegex.test(accountNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateBankAccountNumber(accountNumber)) {
      setErrorMessage("Please enter a valid 10-digit bank account number.");
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("api/v1/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer {access_token}", // Replace with your app's access token
        },
        body: JSON.stringify({
          points,
          accountNumber,
          bankName,
          email: userDetails?.email,
          name: userDetails?.name,
          phone: userDetails?.phone,
          amount: calculateAmount(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to initialize payment");
      }
      const data = await response.json();
      const { authorization_url, access_code } = data;
      window.location.href = authorization_url;
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to initialize payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <div className="item-details">
            <p className="item-details__title">Recyclpal Points</p>
            <p className="item-details__amount">{points} points</p>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="checkout-field">
                <label>Points to Convert</label>
                <input
                  type="number"
                  id="points"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="checkout-field">
                <label>Account Number</label>
                <input
                  type="text"
                  id="account-number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              <div className="checkout-field">
                <label>Bank Name</label>
                <input
                  type="text"
                  id="bank-name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              {isLoading ? (
                <div className="loading">
                  <p>Loading...</p>
                </div>
              ) : (
                <PaystackButton
                  className="paystack-button"
                  email={userDetails?.email}
                  amount={calculateAmount()}
                  metadata={{
                    name: userDetails?.name,
                    phone: userDetails?.phone,
                    accountNumber,
                    bankName,
                  }}
                  publicKey={publicKey}
                  text="Convert Points to Cash"
                  onSuccess={() =>
                    alert("Your request for cash payment has been received.")
                  }
                  onClose={() => alert("Request canceled.")}
                />
              )}
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayStackPayment;
