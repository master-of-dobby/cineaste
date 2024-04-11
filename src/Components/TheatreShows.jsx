import React from "react";

function TheatreShows(props) {
  return (
    <div className="theatre-list-details">
      <div className="theatre-list-det">
        {props.theatre.name} {props.theatre.amenities.join(" ")} :{" "}
        {props.theatre.location}
      </div>
      <div className="theatre-list-showtimes">
        <div className="showtimes">
          {props.theatre.showTime.map((show) => (
            <button className="showtime-btn" key={show.id}>{show.time}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TheatreShows;
