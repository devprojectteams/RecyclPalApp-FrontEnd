import React, { useState } from 'react';

const initialUserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
};

const UserProfileUpdatePage = () => {
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add the logic to submit the updated user profile to your backend here
    console.log('Updated User Profile:', userProfile);
    // You can also show a success message or handle any other actions upon submission.
  };

  return (
    <div className="user-profile-update-page">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userProfile.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userProfile.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={userProfile.bio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfileUpdatePage;
