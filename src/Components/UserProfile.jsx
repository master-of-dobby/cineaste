import React from "react";
import Profile from "./ProfileFiles/Profile";
import userData from "../Collection/userData.json"; 
import Header from "./HomePageFiles/Header";

function UserProfile() {

  return (
    <div>
      <Header/>
      <Profile user={userData[0]} /> {/* Pass userData as prop */}
    </div>
  );
}

export default UserProfile;
