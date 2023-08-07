// import React, { useState } from "react";
// import axios from "axios";
// import { useToaster } from "react-hot-toast";
// import "./PlasticCollectionRequest.css";
// import Navbar from "../home/components/Navbar";
// import Footer from "../home/components/Footer";

// const PlasticCollectionRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const { addToast } = useToaster();
//   const [loading, setLoading] = useState(false);

//   const handleAcceptRecycleRequest = async (requestId) => {
//     setLoading(true);

//     try {
//       const response = await axios.put(
//         `http://localhost:8080/api/v1/request/attendToRequest/${requestId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setLoading(false);
//       setRequests((previousRequests) =>
//         previousRequests.filter((request) => request.requestId !== requestId)
//       );
//       addToast("Recycle Request Accepted", {
//         icon: "👍",
//         style: { backgroundColor: "#4CAF50", color: "#fff" },
//       });
//     } catch (error) {
//       setLoading(false);
//       console.error("API Post Error:", error);
//       addToast("Error accepting Recycle Request", {
//         icon: "❌",
//         style: { backgroundColor: "#F44336", color: "#fff" },
//       });
//     }
//   };

//   const fetchRecycledPlasticRequests = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/v1/request/getRequests",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setRequests(response.data.data);
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         console.error("Unauthorized Access");
//       } else {
//         console.error("Error loading recycled plastic requests:", error);
//       }
//     }
//   };

//   React.useEffect(() => {
//     fetchRecycledPlasticRequests();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="plastic-collection-request">
//         <h3>Plastic Collection Requests</h3>
//         {requests.length > 0 ? (
//           requests.map((request) => (
//             <div key={request.requestId}>
//               <h3> Recycle Request ID: {request.requestId}</h3>
//               <p>Customer: {request.customerName}</p>
//               <p>Sender Phone Number: {request.customerPhoneNumber}</p>
//               <p>Location: {request.location}</p>
//               <button
//                 onClick={() => handleAcceptRecycleRequest(request.requestId)}
//                 disabled={loading}
//               >
//                 {loading ? "Accepting..." : "Accept"}
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No recycle requests found.</p>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PlasticCollectionRequest;
