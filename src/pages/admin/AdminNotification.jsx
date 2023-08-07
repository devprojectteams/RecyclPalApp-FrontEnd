import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../admin/'

const AdminNotification = ({ newRequests }) => {
  // Handle cases where newRequests is not provided or is empty
  if (!newRequests || newRequests.length === 0) {
    return null;
  }

  // Function to handle notification on click of button 
  const handleNotification = () => {
    toast.success("New recycle request received!");
  }

  // Function to handle notification on mount of component
  const handleMountNotification = () => {
    if (newRequests.length > 0) {
      toast.info(`You have ${newRequests.length} new recycle requests!`);
    }
  }

  return (
    <div className="admin-notification">
      <h2>New Recycle Requests:</h2>
      <ul>
        {newRequests.map((request) => (
          <li key={request.id}>
            <span>{request.user}</span> has requested plastic recycling service.
          </li>
        ))}
      </ul>
      {/* Include the ToastContainer at the top-level of the application */}
      <ToastContainer />
      {/* Add a button to trigger notification */}
      <button onClick={handleNotification}>Show Notification</button>
      {/* Call handleMountNotification on mount of component */}
      {handleMountNotification()}
    </div>
  );
};

AdminNotification.propTypes = {
  newRequests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      // Add other required properties here
    })
  ),
};

export default AdminNotification;