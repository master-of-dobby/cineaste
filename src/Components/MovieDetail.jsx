import React, { useEffect, useState } from "react";
import Header from "./HomePageFiles/Header";
import axios from "axios";
import "./Styles/MovieDetail.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import MovieDetailsData from "../Collection/MovieDetailsData.json";

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    // console.log(movieId + "is Id");
    let isMounted = true; // Flag to track if component is mounted

    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/movie/${movieId}`
        );
        if (isMounted) {
          // Check if component is still mounted before updating state
          setMovie(response.data);
        }
      } catch (err) {
        if (isMounted) {
          // Check if component is still mounted before updating state
          setError(err);
        }
      } finally {
        if (isMounted) {
          // Check if component is still mounted before updating state
          setLoading(false);
        }
      }
    };

    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/movie");
  //       console.log(response);
  //       setMovie(response.data);
  //     } catch (err) {
  //       console.log("MOVIE DETAILS NOT FOUND ! " + err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const response = .find((m) => m.id === parseInt(movieId.movieId))
  //   // console.log(response +  ' is response');
  //   setMovie(response);
  // }, [movieId.movieId]);
  // console.log(movie + " det");
  // }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClick = () => {
    navigate(`/theatres-list/${movie.id}`);
  };

  return (
    <div>
      <Header />
      {movie && (
        <>
          <div
            className="movie-top-container"
            style={{
              backgroundImage: `linear-gradient(
      90deg,
      rgba(26, 26, 26, 0.1) 0%,
      rgba(26, 26, 26, 0) 50%,
      rgba(26, 26, 26, 0.8) 100%
    ),
    url(${movie.imageUrl})`,
            }}
          >
            <div className="movie-trailer">
              <iframe
                className="movie-trailer-video"
                src={movie.trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="movie-details-desc">
              <div className="movie-title">{movie.name}</div>
              <div className="movie-ratings">⭐{movie.rating} / 5</div>
              <div className="movie-language">{movie.language}</div>
              <div className="movie-genres">
                {movie.genre.map((genre, index) => (
                  <span key={index}>{genre}</span>
                ))}
              </div>
              <div className="movie-release-date">
                {formatDate(movie.releaseDate)}
              </div>{" "}
              <div className="movie-book-ticket-desc">
                <button
                  className="movie-book-ticket-button"
                  onClick={handleClick}
                >
                  Book Tickets Now!
                </button>
              </div>
            </div>
          </div>
          <div className="movie-description-container">
            <div className="movie-synopsis-title">
              <h3>About the movie</h3>
            </div>
            <div className="movie-synopsis-description">
              {movie.description}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
