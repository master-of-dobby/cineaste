import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/TheatreShows.css";

function TheatreShows({ theatre, movieId }) {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/shows/theatre/${theatre.id}/movie/${movieId}`
        );
        setShows(response.data);
      } catch (err) {
        console.log("Error fetching shows:", err);
      }
    };

    fetchShows();
  }, [theatre.id, movieId]);

  const handleShowClick = (showId) => {
    navigate(
      `/theatres-list/${movieId}/select-tickets/${theatre.id}/${showId}`
    );
  };

  return (
    <>
 
      <div className="theatre-list-showtimes">
        <div className="showtimes">
          {shows.map((show) => (
            <button
              key={show.id}
              className="showtime-btn"
              onClick={() => handleShowClick(show.id)}
            >
              {new Date(show.showTime).toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default TheatreShows;
