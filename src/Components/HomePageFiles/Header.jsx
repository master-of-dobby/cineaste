import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import favicon from "../../Assets/movie_favicon.png";
import userData from "../../Collection/userData.json";
import axios from "axios";
import debounce from "lodash.debounce";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchMovie, setSearchMovie] = useState({
    movie: "",
  });
  const [movieNeeded, setMovieNeeded] = useState(null);

  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (searchMovie.movie) {
      fetchMovie(searchMovie.movie);
    }
  }, [searchMovie.movie]);

  const fetchMovie = useCallback(
    debounce(async (movieName) => {
      try {
        const response = await axios.get(
          `http://13.60.81.230:8080/movieByName`,
          {
            params: { name: movieName },
          }
        );
        console.log(response.data);
        setSearchMovie((prev) => ({ ...prev, movie: response.data.name }));
        setMovieNeeded(response.data);
      } catch (err) {
        alert("Movie NOT FOUND! Enter full name :)");
        console.log("Error in fetching movie : " + err);
      }
    }, 1000),
    []
  ); // Adjust the debounce delay as needed

  const handleSearchMovie = () => {
    // console.log(searchMovie.movie);
    // console.log(movieNeeded);
    if (movieNeeded && movieNeeded.id) {
      navigate(`/movies/movie-detail/${movieNeeded.id}`);
    }
  };

  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setSearchMovie({ ...searchMovie, [name]: value });
  };

  const [userD, setUserD] = useState({});

  useEffect(() => {
    setUserD(userData[1]); // Set the user data here
  }, []);

  useEffect(() => {
    // console.log(userD); // Log the updated user data here
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
          <input
            name="movie"
            onChange={handleMovieChange}
            type="text"
            value={searchMovie.movie}
            placeholder="Search movies..."
          />
          <button onClick={handleSearchMovie}>Search</button>
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
          ) : null}
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
