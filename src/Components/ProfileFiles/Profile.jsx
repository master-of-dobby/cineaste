import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../Assets/user_icon.png";
import "./Profile.css";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleEditProfile = (user) => {
    navigate(`/edit-profile/${user.id}`);
  };

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
        {user.role === "USER" ? (
          user.hasPass ? (
            <div className="user-pass-details">
              {user.pass.passType === "GOLDEN" ? (
                <img
                  src="https://t4.ftcdn.net/jpg/00/93/52/99/360_F_93529943_L2tUn1prkOaXTORT0EVg7K15PSwYtsH4.jpg"
                  className="user-pass-img"
                  alt="Golden Pass"
                />
              ) : (
                <img
                  src="https://media.istockphoto.com/id/1053230998/vector/silver-ticket-vector-illustration.jpg?s=612x612&w=0&k=20&c=dO5Ft8d8s8reu6T46oOd4w9S_A6mNbJddt7UmgnzroQ="
                  className="user-pass-img"
                  alt="Silver Pass"
                />
              )}
              <div>
                <h3>PASS ID: {user.pass.passId}</h3>
                <p>Movies Left: {user.pass.moviesLeft}</p>
              </div>
            </div>
          ) : (
            <div className="profile-pass">
              <h3>Filmy Pass</h3>
              <p>Silver Pass: ₹200 - 50% discount for 5 movies</p>
              <p>Golden Pass: ₹350 - 50% discount for 10 movies</p>
              <Link to="/buy-pass">
                <button className="buy-pass-btn">Buy Filmy Pass</button>
              </Link>
            </div>
          )
        ) : (
          <div className="profile-admin">
            <Link to="/add-movie">
              <button className="profile-admin-add-btns">Add Movie</button>
            </Link>
            <Link to="/add-theatre">
              <button className="profile-admin-add-btns">Add Theatre</button>
            </Link>
          </div>
        )}
        <div className="profile-buttons">
          {/* <Link to="/edit-profile/:user-id"> */}
            <button
              className="edit-profile-btn"
              onClick={() => handleEditProfile(user)}
            >
              Edit Profile
            </button>
          {/* </Link> */}
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
