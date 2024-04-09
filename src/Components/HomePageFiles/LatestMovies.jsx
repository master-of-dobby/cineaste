import React from 'react';
import "./LatestMovies.css";

const LatestMovies = ({ movies }) => {
  return (
    <div className="latest-movies">
      <h2>Latest Movies</h2>
      <div className="movies-container">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <img src={movie.image} alt={movie.title} />
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <button>Book Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMovies;
