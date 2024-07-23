import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import favicon from "../../Assets/movie_favicon.png";
import userData from "../../Collection/userData.json";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // const [userRole, setUserRole] = useState("");
  const [userD, setUserD] = useState({});

  useEffect(() => {
    setUserD(userData[0]); // Set the user data here
  }, []);

  useEffect(() => {
    console.log(userD); // Log the updated user data here
  }, [userD]); // This will run whenever userD changes

  return (
    <header>
      <div className="navbar">
        <div className="left">
          <Link to="/home">
            <img src={favicon} alt="Favicon" className="favicon" />
          </Link>
        </div>
        <div className="middle">
          <input type="text" placeholder="Search movies..." />
          <button>Search</button>
        </div>
        <div className="right">
          <Link to="/movies" className="nav-link">
            Movies
          </Link>
          <Link to="/bookings" className="nav-link">
            My Bookings
          </Link>
          {userD.role === "ADMIN" ? (
            <Link
              to="/show-theaters"
              state={{ userRole: userD.role }}
              className="nav-link"
            >
              Add Shows
            </Link>
          ) : (
            <></>
          )}
          <Link to="/profile" className="nav-link" state={{ userData: userD }}>
            Profile
          </Link>
        </div>
        <button className="navbar-toggle" onClick={toggleNavbar}>
          <span className="navbar-icon"></span>
          <span className="navbar-icon"></span>
          <span className="navbar-icon"></span>
        </button>
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <Link to="/homepage" className="nav-link" onClick={toggleNavbar}>
            Home
          </Link>
          <Link to="/movies" className="nav-link" onClick={toggleNavbar}>
            Movies
          </Link>
          <Link to="/bookings" className="nav-link" onClick={toggleNavbar}>
            Bookings
          </Link>
          <Link
            to={{
              pathname: "/profile",
              state: { userData: userD },
            }}
            className="nav-link"
            onClick={toggleNavbar}
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
