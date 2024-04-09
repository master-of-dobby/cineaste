import React from 'react';
import Header from './HomePageFiles/Header'; 
import Carousel from './HomePageFiles/Carousel'; 
import carouselData from '../Collection/Carousel.json';
import LatestMovies from './HomePageFiles/LatestMovies';
import latestMoviesData from '../Collection/LatestMoviesData.json';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className='carousel'>
        <Carousel movies={carouselData} />
      </div>
      <LatestMovies movies={latestMoviesData}/>
    </div>
  );
};

export default HomePage;
