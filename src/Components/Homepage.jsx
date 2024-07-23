import React, { useEffect, useState } from "react";
import Header from "./HomePageFiles/Header";
import Carousel from "./HomePageFiles/Carousel";
// import carouselData from '../Collection/Carousel.json';
import LatestMovies from "./HomePageFiles/LatestMovies";
import axios from "axios";
// import latestMoviesData from '../Collection/LatestMoviesData.json';
// import MovieDetailsData from "../Collection/MovieDetailsData.json";

const HomePage = () => {
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    const homePageMovies = async () => {
      const response = await axios.get("http://localhost:8080/movies");
      setLatestMovies(response.data);
    };

    homePageMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="carousel">
        <Carousel movies={latestMovies} />
      </div>
      <LatestMovies movies={latestMovies} />
    </div>
  );
};

export default HomePage;
