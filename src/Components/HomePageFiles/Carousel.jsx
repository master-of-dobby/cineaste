import React, { useState, useEffect } from 'react';
import './Carousel.css'; 

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    }, 3000); 

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div className="carousel">
      {movies.map((movie, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${movie.image})` }}
        >
        </div>
      ))}
    </div>
  );
};

export default Carousel;
