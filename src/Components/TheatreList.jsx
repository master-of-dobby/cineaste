import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TheatreShows from "./TheatreShows";
import "./Styles/TheatreList.css";
import Header from "./HomePageFiles/Header";

function TheatreList() {
  const { movieId } = useParams();
  const [filteredTheatreList, setFilteredTheatreList] = useState([]);

  useEffect(() => {
    const fetchTheatresByMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/theatres-by-movie/${movieId}`
        );
        setFilteredTheatreList(response.data);
      } catch (err) {
        console.log("Error fetching theatres:", err);
      }
    };

    fetchTheatresByMovie();
  }, [movieId]);

  return (
    <>
    <div>
      <Header />
      <div className="theatres-list">
        {filteredTheatreList.map((theatre) => (
          <div className="theatre-list-details" key={theatre.id}>
            <div className="theatre-details">
              {" "}
              <h3>{theatre.name}</h3>
              <p>{theatre.location}</p>
            </div>

            {/* <p>Capacity: {theatre.capacity}</p> */}
            <TheatreShows theatre={theatre} movieId={movieId} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default TheatreList;
