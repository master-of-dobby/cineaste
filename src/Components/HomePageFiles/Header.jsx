import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import favicon from "../../Assets/movie_favicon.png"

function Header() {
    return (
        <header>
            <div className="left">
                <Link to="/homepage">
                    <img src={favicon} alt="Favicon" className="favicon" />
                </Link>
            </div>
            <div className="middle">
                <input type="text" placeholder="Search movies..." />
                <button>Search</button>
            </div>
            <div className="right">
                <Link to="/movies" className="nav-link">Movies</Link>
                <Link to="/bookings" className="nav-link">My Bookings</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
            </div>
        </header>
    );
}

export default Header;