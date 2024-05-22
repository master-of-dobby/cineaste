import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import TheatreListData from "../Collection/TheatreListData.json";
import TheatreShows from "./TheatreShows";
import "./Styles/TheatreList.css";
import Header from "./HomePageFiles/Header";
import axios from "axios";

function TheatreList() {
  const movieId = useParams();
  const [filteredTheatreList, setFilteredTheatreList] = useState([]);
  // const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      console.log(movieId.movieId);
      try {
        const response = await axios.get(`http://localhost:8080/theatres-by-movie/${movieId.movieId}`);
        setFilteredTheatreList(response.data);
        console.log(response.data);
        // console.log(filteredTheatreList);
        // setMovieDet();
      } catch (err) {
        console.log("Error in finding find theatres list " + err);
      }
    };

    fetchTheatres();
  }, [movieId]);

  // const setMovieDet = () => {
  //   filteredTheatreList.movie.id
  // }

  // useEffect(() => {
  //   const filteredData = TheatreListData.filter(
  //     (t) => t.movie.id === parseInt(movieId.movieId) && t.showtime !== ""
  //   );

  //   setFilteredTheatreList((prevFilteredTheatreList) => {
  //     // Only update the state if the new data is different from the previous state
  //     if (
  //       JSON.stringify(prevFilteredTheatreList) !== JSON.stringify(filteredData)
  //     ) {
  //       return filteredData;
  //     } else {
  //       return prevFilteredTheatreList;
  //     }
  //   });

  // const movie = filteredData.find(
  //   (theatre) => theatre.movie.id === parseInt(movieId.movieId)
  // );

  //   if (movie) {
  //     setMovieDetails({
  //       name: movie.movie.name,
  //       year: new Date(movie.movie.releaseDate).getFullYear(),
  //     });
  //   } else {
  //     console.log("Movie not found for ID:", movieId.movieId);
  //   }
  // }, [movieId]);

  return (
    <div>
      <Header />
      <div className="theatres-list-movie-details">
        {/* Movie Details */}
        {/* {movieDetails && (
          <>
            <div className="theatres-list-movie-detail">
              <h1>
                {movieDetails.name} {movieDetails.year}
              </h1>
            </div>
          </>
        )} */}
      </div>
      <div className="theatres-list">
        {/* <ul> */}
        {/* Map over the filtered list and render each theatre */}
        {filteredTheatreList.map((theatre) => (
          //   <li key={theatre.id}>{theatre.name}</li>
          <TheatreShows theatre={theatre} />
        ))}
        {/* </ul> */}
      </div>
    </div>
  );
}

export default TheatreList;
