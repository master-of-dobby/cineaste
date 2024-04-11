import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import favicon from "../../Assets/movie_favicon.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
          <Link to="/profile" className="nav-link">
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
          <Link to="/profile" className="nav-link" onClick={toggleNavbar}>
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
