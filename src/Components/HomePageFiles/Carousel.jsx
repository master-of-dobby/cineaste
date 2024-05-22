import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

const Carousel = ({ movies }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [movies.length]);

  const handleClick = (id) => {
    navigate(`/movies/movie-detail/${id}`);
  };

  return (
    <div className="carousel-div">
      {movies.map((movie, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          id="slide"
          onClick={() => handleClick(movie.id)}
          style={{
            backgroundImage: `url(${movie.imageUrl})`,
            cursor: "pointer",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Carousel;
