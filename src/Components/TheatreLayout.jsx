import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Styles/TheatreLayout.css";

function TheaterLayout() {
  const [theatreDetails, setTheatreDetails] = useState({});
  const [platinumCapacity, setPlatinumCapacity] = useState(0);
  const [diamondCapacity, setDiamondCapacity] = useState(0);
  const [goldCapacity, setGoldCapacity] = useState(0);
  const theatreParams = useParams();
  const theatreId = theatreParams.theatreId;

  const [platinumSeats, setPlatinumSeats] = useState([]);
  const [diamondSeats, setDiamondSeats] = useState([]);
  const [goldSeats, setGoldSeats] = useState([]);

  const { showId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Theatre Id : " + theatreId);
      try {
        const response = await axios.get(
          `http://localhost:8080/theatre/${theatreId}`
        );
        // console.log(response.data);
        setTheatreDetails(response.data);
      } catch (err) {
        console.log("Theatre NOT FOUND!" + err);
      }
    };

    fetchData();
  }, [theatreId]);

  useEffect(() => {
    if (theatreDetails) {
      setPlatinumCapacity(theatreDetails.platinumCapacity || 0);
      setDiamondCapacity(theatreDetails.diamondCapacity || 0);
      setGoldCapacity(theatreDetails.goldCapacity || 0);
      getSeatRows(
        theatreDetails.platinumCapacity,
        theatreDetails.diamondCapacity,
        theatreDetails.goldCapacity
      );
    }
  }, [theatreDetails]);

  const getSeatRows = (platCapacity, diaCapacity, goldCapacity) => {
    const seatRows = [];
    let seatAlpha = 0;
    const maxSeatsPerRow = 15;
    let currentRowSeats = [];

    const pushCurrentRowSeats = () => {
      if (currentRowSeats.length > 0) {
        seatRows.push(currentRowSeats);
        currentRowSeats = [];
        seatAlpha++;
      }
    };

    const addSeats = (capacity) => {
      for (let i = 0; i < capacity; i++) {
        if (currentRowSeats.length === maxSeatsPerRow) {
          pushCurrentRowSeats();
        }
        currentRowSeats.push(
          `${String.fromCharCode(65 + seatAlpha)}${(i % maxSeatsPerRow) + 1}`
        );
      }
      pushCurrentRowSeats();
    };

    addSeats(platCapacity);
    addSeats(diaCapacity);
    addSeats(goldCapacity);

    assignSeats(seatRows, platCapacity, diaCapacity, goldCapacity);
  };

  const assignSeats = (seatRows, platCapacity, diaCapacity, goldCapacity) => {
    const platSeats = seatRows.slice(0, Math.ceil(platCapacity / 15));
    const diaSeats = seatRows.slice(
      Math.ceil(platCapacity / 15),
      Math.ceil((platCapacity + diaCapacity) / 15)
    );
    const goldSeats = seatRows.slice(
      Math.ceil((platCapacity + diaCapacity) / 15)
    );

    setPlatinumSeats(platSeats);
    setDiamondSeats(diaSeats);
    setGoldSeats(goldSeats);
  };

  // Assuming you have a state to track booked seats
  const [bookedSeats, setBookedSeats] = useState([]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [showSeats, setShowSeats] = useState([]);

  useEffect(() => {
    const fetchSeat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/seats/${showId}`
        );
        console.log(response);
        setShowSeats(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Getting error in fetching seats : " + err);
      }
    };

    fetchSeat();
  }, []);

  const handleSeatSelection = (seat) => {
    if (bookedSeats.includes(seat)) {
      console.log(`Seat ${seat} is already booked.`);
    } else {
      console.log(`Seat ${seat} is booking`);
      if (!selectedSeats.includes(seat)) {
        setSelectedSeats([...selectedSeats, seat]); // Add selected seat to state
      } else {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat)); // Deselect seat if already selected
      }
    }
  };

  return (
    <>
      <div className="select-tickets">
        <div className="theatre-section-layout">
          <div className="theatre-section-layout__header-subtitle">
            Select your seats for the show - <b>{theatreDetails.name}</b>
          </div>

          <div className="platinum-seats">
            {platinumSeats.map((row, rowIndex) => (
              <div className="seat-row" key={`plat-row-${rowIndex}`}>
                {row.map((seat, seatIndex) => (
                  <div
                    className="plat-theatre-seats"
                    key={`plat-${seatIndex}`}
                    onClick={() => handleSeatSelection(`${seat}`)}
                  >
                    {seat}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="diamond-seats">
            {diamondSeats.map((row, rowIndex) => (
              <div className="seat-row" key={`dia-row-${rowIndex}`}>
                {row.map((seat, seatIndex) => (
                  <div
                    className="dia-theatre-seats"
                    key={`dia-${seatIndex}`}
                    onClick={() => handleSeatSelection(`${seat}`)}
                  >
                    {seat}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="gold-seats">
            {goldSeats.map((row, rowIndex) => (
              <div className="seat-row" key={`gold-row-${rowIndex}`}>
                {row.map((seat, seatIndex) => (
                  <div
                    className="gold-theatre-seats"
                    key={`gold-${seatIndex}`}
                    onClick={() => handleSeatSelection(`${seat}`)}
                  >
                    {seat}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="selected-tickets">
          <div className="selected-tickets-box">
            <h3>Selected Tickets</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default TheaterLayout;
