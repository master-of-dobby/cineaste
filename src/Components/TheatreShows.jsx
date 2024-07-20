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
          `http://13.60.81.230:8080/shows/theatre/${theatre.id}/movie/${movieId}`
        );
        setShows(response.data);
      } catch (err) {
        console.log("Error fetching shows:", err);
      }
    };

    fetchShows();
  }, [theatre.id, movieId]);

  const handleShowClick = (showId, showTime) => {
    navigate(
      `/theatres-list/${movieId}/select-tickets/${theatre.id}/show/${showId}/time/${showTime}`
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
              onClick={() => handleShowClick(show.id, show.showTime)}
            >
              {new Date(show.showTime).toLocaleString()}
            </button>
          ))}
          {console.log(shows)}
        </div>
      </div>
    </>
  );
}

export default TheatreShows;
