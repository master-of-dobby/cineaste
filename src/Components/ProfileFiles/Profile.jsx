import React from "react";
import { Link } from "react-router-dom";
import profileImage from "../../Assets/user_icon.png";
import "./Profile.css";

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Location: {user.location}</p>
        </div>
        <div className="profile-pass">
          <h3>Filmy Pass</h3>
          <p>Silver Pass: ₹200 - 50% discount for 5 movies</p>
          <p>Golden Pass: ₹350 - 50% discount for 10 movies</p>
          <Link to="/buy-pass">
            <button className="buy-pass-btn">Buy Filmy Pass</button>
          </Link>
        </div>
        <div className="profile-buttons">
          <Link to="/edit-profile">
            <button className="edit-profile-btn">Edit Profile</button>
          </Link>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
