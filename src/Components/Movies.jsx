import React, { useState } from "react";
import Header from "./HomePageFiles/Header";
// import moviesData from "../Collection/moviesData.json";
import "./HomePageFiles/LatestMovies";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null); // Track API errors
  const navigate = useNavigate();

  // useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movies");
      setMovies(response.data);
      console.log(movies);
    } catch (err) {
      setError(err); // Store error for handling
      console.error("Error fetching movies:", err);
    }
  };
  fetchData();
  // }, [movies]);

  const bookTicket = (movieId) => {
    console.log(movieId + " is calling");
    navigate(`movie-detail/${movieId}`);
  };

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  if (!movies) {
    return <div>Loading movies...</div>; // Display loading state
  }

  return (
    <div>
      <Header />
      <div className="movies-page">
        <h2>All Movies</h2>
        <div className="movies-container">
          {movies.map((movie, index) => (
            <div className="movie-card" key={index}>
              <img src={movie.imageUrl} alt={movie.title} />
              <div className="movie-details">
                <h3>{movie.name}</h3>
                <p>{movie.genre}</p>
                <button onClick={() => bookTicket(movie.id)}>
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
