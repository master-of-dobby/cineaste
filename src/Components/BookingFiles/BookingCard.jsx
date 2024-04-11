import React from "react";
import "./BookingCard.css"; // Import your CSS file for styling

const BookingCard = ({ booking }) => {
  const { movieImage, movieName, language, date, time, theatreName, location, ticketsBooked, seatNumbers } = booking;

  return (
    <div className="booking-card">
      <img src={movieImage} alt="Movie Poster" className="movie-poster" />
      <div className="booking-details">
        <h2>{movieName}</h2>
        <p>Language: {language}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Theatre: {theatreName}</p>
        <p>Location: {location}</p>
        <p>No. of Tickets: {ticketsBooked}</p>
        <p>Seat Number: {seatNumbers.join(", ")}</p>
      </div>
    </div>
  );
};

export default BookingCard;
