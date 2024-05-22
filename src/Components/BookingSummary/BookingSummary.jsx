import { useEffect, useState } from "react";
import data from "../../Collection/BookSummaryData.json";
import { useNavigate } from "react-router-dom";
import "./BookingSummary.css";

function BookingSummary() {
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingData && data.length > 0) {
      setBookingData(data[2]);
    }
  }, [bookingData]);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  function calculateNetPayable(bookingData) {
    const baseAmount = bookingData.totalAmount + bookingData.totalAmount * 0.18;

    if (bookingData.isPassHolder) {
      if (
        (bookingData.pass.passType === "silver" &&
          bookingData.seats[0].seatType === "diamoind") ||
        bookingData.pass.moviesLeft < 1
      ) {
        return baseAmount;
      } else {
        return (
          baseAmount - bookingData.showPrice - bookingData.showPrice * 0.18
        );
      }
    } else {
      return baseAmount;
    }
  }

  function getPass() {
    if (!bookingData.isPassHolder) navigate("/buy-pass");
  }

  return (
    <>
      <div className="booking-summary">
        <h1>Booking Summary</h1>
        <div className="booking-summary-seat-details">
          <p style={{ fontWeight: "bold" }}>{bookingData.movieTitle}</p>
          <p>
            {bookingData.theatreName} {bookingData.bookingDate}{" "}
            {bookingData.timeSlot}
          </p>
          <p>Total Seats : {bookingData.noOfSeats}</p>
          <p>
            {bookingData.seats[0].seatType}
            {bookingData.seats.map((seat, index) => (
              <span key={index}> {seat.seatNumber} </span>
            ))}
          </p>
          <div className="amount-total">
            <p>Total Amount</p>
            <p>{bookingData.totalAmount}</p>
          </div>
          <div className="convenience-fee">
            <p>Convenience Fee</p>
            <p>{bookingData.totalAmount * 0.18}</p>
          </div>
          <div className="net-payable">
            <p>Net Amount</p>
            <p>
              {parseFloat(
                bookingData.totalAmount + bookingData.totalAmount * 0.18
              ).toFixed(2)}
            </p>
          </div>
          <div className="pass-discount">
            <p>
              Pass Holder :{" "}
              {bookingData.isPassHolder ? (
                <span>
                  "Yaaay!Yess"
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <b>-{bookingData.showPrice + bookingData.showPrice * 0.18}</b>
                </span>
              ) : (
                "Get a one dude!"
              )}{" "}
              {bookingData.isPassHolder ? null : (
                <button
                  onClick={getPass}
                  className="get-pass-btn"
                  // style={
                  //   ({ border: "none" },
                  //   { height: "2rem" },
                  //   { borderRadius: "2rem" },
                  //   { border: "none" })
                  // }
                >
                  Get it!
                </button>
              )}
            </p>
          </div>
          <div className="total-net-payable">
            <h4>Net Payable : </h4> <h2> {calculateNetPayable(bookingData)}</h2>
          </div>
        </div>
        <div className="book-proceed">
          <button className="book-proceed-btn">Proceed</button>
        </div>
      </div>
    </>
  );
}

export default BookingSummary;
