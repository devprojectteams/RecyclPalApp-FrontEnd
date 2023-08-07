import { usePaystackPayment } from 'react-paystack';
import React from 'react';
// import "./"

const PaystackPayment = () => {

  const config = {
    reference: (new Date()).getTime().toString(),
    email: "ogunsmoyin.m@gmail.com",
    amount: 30000,
    publicKey: 'pk_test_df4962a615cd623dfe64e3038c7576e6783273a2'
  };


  const onSuccess = (reference) => {
    console.log(reference);
  };


  const onClose = () => {
    console.log('closed')
  }

const initializePayment = usePaystackPayment(config);

  return (
    <React.Fragment>
      <div id="paymentForm">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email-address" required />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="tel" id="amount" required />
        </div>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
        </div>
        <div>
            <button onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Make Payment</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default PaystackPayment;