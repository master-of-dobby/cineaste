import React from 'react';
import Header from './HomePageFiles/Header';
import moviesData from '../Collection/moviesData.json';  
import './HomePageFiles/LatestMovies'

const Movies = () => {
  return (
    <div>
      <Header />
      <div className="movies-page">
        <h2>All Movies</h2>
        <div className="movies-container">
          {moviesData.map((movie, index) => (
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
    </div>
  );
};

export default Movies;
