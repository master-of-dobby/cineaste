import React from 'react';
import Header from './HomePageFiles/Header'; 
import Carousel from './HomePageFiles/Carousel'; 
// import carouselData from '../Collection/Carousel.json';
import LatestMovies from './HomePageFiles/LatestMovies';
// import latestMoviesData from '../Collection/LatestMoviesData.json';
import MovieDetailsData from "../Collection/MovieDetailsData.json";


const HomePage = () => {
  return (
    <div>
      <Header />
      <div className='carousel'>
        <Carousel movies={MovieDetailsData} />
      </div>
      <LatestMovies movies={MovieDetailsData}/>
    </div>
  );
};

export default HomePage;
