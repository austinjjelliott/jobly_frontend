import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext"; // Import UserContext
import { useNavigate } from "react-router-dom"; // For redirection after update

function ProfileForm({ updateUser }) {
  const { currentUser } = useContext(UserContext); // Access the current user from context
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate(); // For redirecting to another page after the update

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]); // Update form data when currentUser changes

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.username) {
      console.error("User is not logged in or username is undefined.");
      return;
    }

    // Prepare the user data for updating (excluding username)
    const updatedUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    try {
      await updateUser(currentUser.username, updatedUser); // Pass the current username to updateUser
      alert("Profile Updated");
      navigate("/"); // Redirect to profile page after updating
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {currentUser ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfileForm;
