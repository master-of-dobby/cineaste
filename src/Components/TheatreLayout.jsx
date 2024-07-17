import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Styles/TheatreLayout.css";
import userData from "../Collection/userData.json";

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
  const [selectedCount, setSelectedCount] = useState(0);

  const { showId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/theatre/${theatreId}`
        );
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
        // console.log(seatRows);
      }
    };

    const addSeats = (capacity) => {
      for (let i = 0; i < capacity; i++) {
        if (currentRowSeats.length === maxSeatsPerRow) {
          // console.log(currentRowSeats);
          pushCurrentRowSeats();
        }
        currentRowSeats.push(
          `${String.fromCharCode(65 + seatAlpha)}${(i % maxSeatsPerRow) + 1}`
        );
      }
      pushCurrentRowSeats();
    };

    // console.log(platCapacity + " " + diaCapacity + " " + goldCapacity);

    addSeats(platCapacity);
    addSeats(diaCapacity);
    addSeats(goldCapacity);

    assignSeats(seatRows, platCapacity, diaCapacity, goldCapacity);
  };

  const assignSeats = (seatRows, platCapacity, diaCapacity, goldCapacity) => {
    let start = 0;
    let end = Math.floor(platCapacity / 15);
    end = platCapacity % 15 > 0 ? ++end : end;
    // end++;
    console.log(start + " " + end);
    const platSeats = seatRows.slice(start, end);
    start = end;
    end = end + Math.floor(diaCapacity / 15);
    end = diaCapacity % 15 > 0 ? ++end : end;
    // end++;

    console.log(start + " " + end);

    const diaSeats = seatRows.slice(start, end);
    start = end;
    end = end + Math.floor(goldCapacity / 15);
    end = goldCapacity % 15 > 0 ? ++end : end;
    // end++;

    console.log(start + " " + end);
    const goldSeats = seatRows.slice(start, end);

    setPlatinumSeats(platSeats);
    setDiamondSeats(diaSeats);
    setGoldSeats(goldSeats);

    // console.log(platinumCapacity + " " + diamondCapacity + " " + goldCapacity);
    //console.log(platSeats + " " + diaSeats + " " + goldSeats);
  };

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeats, setShowSeats] = useState([]);

  useEffect(() => {
    const fetchSeat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/seats/${showId}`
        );
        setShowSeats(response.data);
        assignBookedSeats(response.data);
      } catch (err) {
        console.log("Getting error in fetching seats : " + err);
      }
    };

    fetchSeat();
  }, [showId]);

  const assignBookedSeats = (seats) => {
    const booked = seats
      .filter((seat) => seat.seatStatus === "BOOKED")
      .map((seat) => seat.seatNumber);
    setBookedSeats(booked);
  };

  useEffect(() => {
    const markBookedSeat = () => {
      bookedSeats.forEach((seatNumber) => {
        const thatSeat = document.getElementById(seatNumber);
        if (thatSeat) {
          thatSeat.classList.add("booked");
        }
        // console.log(seatNumber);
      });
    };

    markBookedSeat();
  }, [bookedSeats]);

  const checkSeatAvailable = (seatNumber) => {
    // console.log(seatNumber);
    const seat = showSeats.find((seat) => seat.seatNumber === seatNumber);
    // console.log(seat.seatStatus);
    return seat?.seatStatus === "AVAILABLE";
  };

  useEffect(() => {
    const markSelectedSeat = () => {
      selectedSeats.forEach((seatNumber) => {
        const thatSeat = document.getElementById(seatNumber);
        // const parentEle = thatSeat.;
        if (thatSeat) {
          thatSeat.classList.add("selected");
        }
      });
    };
    markSelectedSeat();
  }, [selectedSeats]);

  const [selectedPrice, setSelectedPrice] = useState(0.0);

  const handleSeatSelection = (seatNumber, seatType) => {
    // console.log(seatNumber);
    if (selectedSeats.includes(seatNumber)) {
      const thatUnselectedSeat = document.getElementById(seatNumber);
      thatUnselectedSeat.classList.remove("selected");
      const index = selectedSeats.indexOf(seatNumber);
      selectedSeats.splice(index, 1);
      setSelectedCount((prevSelectedCount) => prevSelectedCount - 1);
      if (seatType === "platinum") {
        setSelectedPrice((prevSelectedPrice) => prevSelectedPrice - 200.0);
      } else if (seatType === "diamond") {
        setSelectedPrice((prevSelectedPrice) => prevSelectedPrice - 150.0);
      } else if (seatType === "gold") {
        setSelectedPrice((prevSelectedPrice) => prevSelectedPrice - 100.0);
      }
    } else if (selectedCount === 6) {
      alert("You cannot book more than 6 tickets :)");
      return;
    } else if (checkSeatAvailable(seatNumber)) {
      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        seatNumber,
      ]);

      if (seatType === "platinum") {
        setSelectedPrice((prevSelectedPrice) => prevSelectedPrice + 200.0);
      } else if (seatType === "diamond") {
        setSelectedPrice((prevSelectedPrice) => prevSelectedPrice + 150.0);
      } else if (seatType === "gold") {
        setSelectedPrice((prevSelectedPrice) => prevSelectedPrice + 100.0);
      }
      setSelectedCount((prevSelectedCount) => prevSelectedCount + 1);
    } else {
      console.log("already booked");
      window.alert("Already Booked, Try other :) ");
    }
  };

  // is PassHolder logic
  const [isPassHolder, setIsPassHolder] = useState(false);
  const [passHolder, setPassHolder] = useState({});

  useEffect(() => {
    const setPassHolderDetails = () => {
      setPassHolder(() => userData[0]);
      setIsPassHolder(() => passHolder.hasPass);

      // console.log(userData[0]);
      // console.log(passHolder);
    };
    setPassHolderDetails();
  }, [passHolder]);

  useEffect(() => {
    const passDeduct = () => {
      if (isPassHolder) {
        if (selectedCount === 1) {
          setPassDeduction(() => selectedPrice + 0.18 * selectedPrice);
        }
        if (selectedCount == 0) {
          setPassDeduction(0);
        }
      }
    };
    passDeduct();
  }, [selectedCount]);

  const navigate = useNavigate();

  const onClickToBuyPass = () => {
    navigate(`/buy-pass`);
  };

  const [passDeduction, setPassDeduction] = useState(0.0);

  const onClickToPay = () => {
    console.log("Successfully Paid");
    window.location.reload();
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
                    className={`plat-theatre-seats ${
                      bookedSeats.includes(seat) ? "booked" : ""
                    }`}
                    key={`plat-${seatIndex}`}
                    id={seat}
                    onClick={() => handleSeatSelection(seat, "platinum")}
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
                    className={`dia-theatre-seats ${
                      bookedSeats.includes(seat) ? "booked" : ""
                    }`}
                    key={`dia-${seatIndex}`}
                    id={seat}
                    onClick={() => handleSeatSelection(seat, "diamond")}
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
                    className={`gold-theatre-seats ${
                      bookedSeats.includes(seat) ? "booked" : ""
                    }`}
                    key={`gold-${seatIndex}`}
                    id={seat}
                    onClick={() => handleSeatSelection(seat, "gold")}
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
            <h2>Selected Tickets</h2>
            <p
              style={{
                fontStyle: "italic",
                fontFamily: "sans-serif",
                fontSize: "0.7rem",
              }}
            >
              ( * choose your ticket first to get maximum avail of discount on
              pass holder )
            </p>
            <div className="selected-seat-numbers">
              {selectedSeats.map((seat, index) => (
                <>
                  <div key={index}> {seat} </div>
                  {index < 5 ? <div>,</div> : null}
                </>
              ))}
            </div>

            <div className="selected-ticket-count">
              (<span style={{ fontWeight: "bold" }}>{selectedCount}</span>{" "}
              tickets)
            </div>

            <div className="price-details">
              <div className="selected-total-price">
                <div>Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <span className="selected-total-price-value">
                  ₹ {selectedPrice}
                </span>
              </div>

              <div className="selected-tax">
                <div>
                  Tax&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <span className="selected-total-price-value">
                  ₹ {0.18 * selectedPrice}
                </span>
              </div>

              <div className="isPassHolder">
                <div>
                  Pass Holder ?
                  {isPassHolder ? (
                    <div style={{ fontWeight: "bold" }}>Yaay...Yes :)</div>
                  ) : (
                    <div>
                      No! &nbsp;
                      <button
                        className="get-here-pass"
                        onClick={onClickToBuyPass}
                      >
                        GET HERE
                      </button>
                    </div>
                  )}
                </div>
                <span className="selected-total-price-value">
                  - ₹ {passDeduction}
                </span>
              </div>

              <hr
                style={{
                  backgroundColor: "black",
                  height: "0.1rem",
                  border: "none",
                  boxShadow: "0.01rem 0.01rem 0.01rem 0.01rem",
                }}
              ></hr>

              <div className="sub-total">
                <div>Sub Total</div>
                <span className="selected-total-price-value">
                  ₹ {selectedPrice + 0.18 * selectedPrice}
                </span>
              </div>

              <div className="payable-amount-btn-div">
                <button className="payable-amount-btn" onClick={onClickToPay}>
                  ₹ {selectedPrice + 0.18 * selectedPrice}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TheaterLayout;
