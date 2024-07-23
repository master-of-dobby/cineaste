import React, { useEffect, useState } from "react";
import Profile from "./ProfileFiles/Profile";
import Header from "./HomePageFiles/Header";
import { useLocation } from "react-router-dom";
// import userData from "../Collection/userData.json";

function UserProfile() {
  const location = useLocation();
  const { userData } = location.state || {};
  console.log(location.state);
  // console.log(userData);

  const [userD, setUserData] = useState({});

  useEffect(() => {
    setUserData(() => userData);
  }, [userData]);

  return (
    <div>
      <Header />
      {userD && <Profile user={userD} />}
    </div>
  );
}

export default UserProfile;
