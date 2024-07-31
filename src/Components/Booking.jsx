import React, { useEffect, useState } from "react";
import BookingCard from "./BookingFiles/BookingCard";
import axios from "axios";
import Header from "./HomePageFiles/Header";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [bookedTicketsData, setBookedTicketsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://13.60.81.230:8080/tickets");
        console.log(response.data);
        setBookedTicketsData(response.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bookedTicketsData.length === 0) {
        alert("NO TICKETS FOUND :)");
        navigate("/movies");
      }
    }, 10000);

    // Clear the timeout if the component unmounts or data fetch completes
    return () => clearTimeout(timer);
  }, [bookedTicketsData, navigate]);

  return (
    <>
      <Header />
      <div className="bookings-page">
        <h1 style={{ textAlign: "center" }}>Booked Movie Tickets</h1>
        {bookedTicketsData.length > 0 ? (
          bookedTicketsData.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))
        ) : (
          <p>Loading tickets...</p>
        )}
      </div>
    </>
  );
};

export default Booking;
