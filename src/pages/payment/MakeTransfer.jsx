import React from "react";
import axios from "axios";
// import '../payment/'

const MakePaymentTransfer = ()=>{
    const send = async () => {
        const options = {
            // hostname: 'api.paystack.co',
            // port: 443,
            path: '/bank?currency=NGN',
            // method: 'GET',
            policy: "strict-origin-when-cross-origin",
            headers: {
              Authorization: 'Bearer SECRET_KEY'
            }
          }
          try {
            const response = await axios.get('https://api.paystack.co:443/bank?currency=NGN', options);
            alert("Bank list fetched!")
            console.log(response.data)
          } catch (error) {
            console.log(error);
          }
        };

        return(
            <React.Fragment>                
                <div>
                    <button onClick={send}>Fetch Bank List</button>
                </div>
            </React.Fragment>
        );
    
}

export default MakePaymentTransfer;