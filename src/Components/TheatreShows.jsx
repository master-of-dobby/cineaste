import React from "react";
import { useNavigate } from "react-router-dom";

function TheatreShows(props) {
  const navigate = useNavigate();

  // const bookTicket = (id, time) => {
  //   navigate(`/booking-summary/${id}/${time}`);
  // };

  return (
    <div className="theatre-list-details">
      <div className="theatre-list-det">
        {console.log(props.theatre)}
        {props.theatre.name} {props.theatre.amenities.join(" ")} :{" "}
        {props.theatre.location}
        <p style={{ fontSize: "17px" }}>Non Cancellable</p>
      </div>
      <div className="theatre-list-showtimes">
        <div className="showtimes">
          {/* {props.theatre.showTime.map((show) => (
            
          ))} */}
          <button
            // onClick={() => bookTicket(show.id, show.time)}
            className="showtime-btn"
            // key={show.id}
          >
            Book Ticket
            {/* {show.time} */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TheatreShows;
