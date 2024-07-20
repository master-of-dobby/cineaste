import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PaymentSucceeded() {
  const location = useLocation();

  const {
    hasPass,
    total_amount,
    seats_selected,
    show_id,
    show_time,
    theatre_name,
    theatre_location,
  } = location.state || {};

  useEffect(() => {
    const makeSeatsBooked = async () => {
      seats_selected.map(async (seatNum) => {
        const response = await axios.put(
          `http://localhost:8080/seat/${show_id}/${seatNum}`
        );
        console.log(response);
      });
    };
    makeSeatsBooked();
  });

  return (
    <>
      <div className="payment-pass-holder">
        <div className="payment-pass-holder-seat">
          <h1>BOOKING</h1>
          {hasPass ? <p>Enjoying the pass :)</p> : ""}
          <div className="img-at-payment"></div>
          <div className="show-details-payment">
            <div className="theatre-details-payment">
              <p className="theatre-details-payment-p"> {theatre_name} </p>
              <p className="theatre-details-payment-p"> {theatre_location} </p>
            </div>
            <p>{show_time}</p>
          </div>

          <div className="seats-payment">
            {seats_selected.map((seat) => {
              return (
                <div className="seat" key={seat}>
                  {seat} &nbsp;
                </div>
              );
            })}
          </div>
          {/* <button className="payment-pass-holder-btn">Book</button> */}
        </div>
      </div>
    </>
  );
}

export default PaymentSucceeded;
