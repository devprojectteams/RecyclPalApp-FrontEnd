import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Notify = () => {

  const makeToast = () => {
    toast.success('Here is your toast.', {
      style: {
        borderRadius: '4px',
        background: '#4caf50',
        color: '#fff',
      },
    });
  };

  return (
    <div>
      <button onClick={makeToast}>Make me a toast</button>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'my-toast',
          duration: 3000,
        }}
      />
    </div>
  );
};

export default Notify;
