import React from "react";
import "./LatestMovies.css";
import { useNavigate } from "react-router-dom";

const LatestMovies = ({ movies }) => {
  const navigate = useNavigate();

  const handleCheck = (id) => {
    navigate(`/movies/movie-detail/${id}`);
  };

  return (
    <div className="latest-movies">
      <h2>Latest Movies</h2>
      <div className="movies-container">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <img src={movie.imageUrl} alt={movie.title} />
            <div className="movie-details">
              <h3>{movie.name}</h3>
              <p>{movie.genre + " "}</p>
              <button onClick={() => handleCheck(movie.id)}>
                Book Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMovies;
