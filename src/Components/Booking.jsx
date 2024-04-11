import React from "react";
import BookingCard from "./BookingFiles/BookingCard";
import bookedTicketsData from "../Collection/tickets.json";
import Header from "./HomePageFiles/Header";

const Booking = () => {
  return (
    <>
      <Header/>
      <div className="bookings-page">
        <h1 style={{textAlign:"center"}}>Booked Movie Tickets</h1>
        {bookedTicketsData.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </div>
    </>
    
  );
};

export default Booking;
