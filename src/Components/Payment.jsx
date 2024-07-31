import React, { useEffect, useState } from "react";
import "./Payment.css";
import Header from "./HomePageFiles/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [selectedUpiOption, setSelectedUpiOption] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [netBanking, setNetBanking] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [show, setShow] = useState();

  const location = useLocation();

  const {
    hasPass,
    total_amount,
    seats_selected,
    show_id,
    show_time,
    theatre_name,
    theatre_location,
    seats_count,
    seat_numbers,
  } = location.state || {};

  //console.log(seat_numbers + " " + typeof seat_numbers);

  const navigate = useNavigate();

  useEffect(() => {
    const settingShow = async () => {
      try {
        const response = await axios.get(
          `http://13.60.81.230:8080/show/${show_id}`
        );
        setShow(response.data);
        //console.log(response.data);
        //console.log("setted show " + show);
      } catch (err) {
        console.log("Error in setting show : " + err);
      }
    };

    settingShow();
  }, [show_id]);

  const [madeTransaction, setMadeTransaction] = useState();
  const [madeTicket, setMadeTicket] = useState();

  const makeTransaction = async () => {
    try {
      // selectedPaymentMethod = selectedPaymentMethod.upperCase();
      const response = await axios.post(
        `http://13.60.81.230:8080/transaction`,
        {
          paymentMode: selectedPaymentMethod,
          totalAmount: total_amount,
          paymentStatus: paymentStatus,
          transactionDate: new Date().toISOString(), // Use ISO 8601 format
        }
      );
      setMadeTransaction(response.data);
      //console.log("Transaction response:", response.data);
      //console.log(madeTransaction);
      return response.data;
    } catch (err) {
      console.error("Error in creating transaction: ", err);
      throw err;
    }
  };

  const makeTicket = async (transaction) => {
    try {
      const response = await axios.post(
        "http://13.60.81.230:8080/book-ticket",
        {
          totalTickets: seats_count,
          show: show,
          seats: seat_numbers,
          transaction: transaction, // Use the transaction passed as an argument
        }
      );

      setMadeTicket(response.data);
      console.log("Ticket response:", response.data);
      //console.log(madeTicket);
    } catch (err) {
      console.error("Error in booking ticket: ", err);
      throw err;
    }
  };

  const startTransaction = async () => {
    try {
      const transactionResponse = await makeTransaction();
      console.log("Transaction response " + transactionResponse);
      if (transactionResponse) {
        await makeTicket(transactionResponse);
      }
    } catch (err) {
      console.error("Error in starting transaction: ", err);
    }
  };

  useEffect(() => {
    //console.log(paymentStatus + " " + paymentSuccess);
    if (
      paymentSuccess &&
      paymentStatus === "SUCCESS"
      // (paymentSuccess && paymentStatus === "SUCCESS" && selectedPaymentMethod)
    ) {
      startTransaction().then(() => {
        navigate("/paymentSucceeded", {
          state: {
            hasPass: hasPass,
            total_amount: total_amount,
            seats_selected: seats_selected,
            show_id: show_id,
            theatre_name: theatre_name,
            theatre_location: theatre_location,
            show_time: show_time,
            payment_method: selectedPaymentMethod,
            seat_numbers: seat_numbers,
            seats_count: seats_count,
          },
          replace: true,
        });
      });
    }
  }, [paymentSuccess, paymentStatus]);

  const handleMakePayment = () => {
    if (hasPass && total_amount === 0) {
      setSelectedPaymentMethod("PASS");
      setPaymentSuccess(true);
      setPaymentStatus("SUCCESS");
    } else {
      if (selectedPaymentMethod === "card") {
        const { cardNumber, cardName, expiryDate, cvv } = cardDetails;
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
          alert("Please fill out all credit card details.");
          return;
        }
      }

      if (selectedPaymentMethod === "upi" && !upiId) {
        alert("Please enter your UPI ID.");
        return;
      }

      if (selectedPaymentMethod === "netBanking") {
        if (!netBanking) {
          alert("Please select a bank.");
          return;
        }
        if (!mobileNumber) {
          alert("Please enter your mobile number.");
          return;
        }
      }

      setPaymentSuccess(true);
      setPaymentStatus("SUCCESS");
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentSuccess(false);
    setPaymentStatus("PENDING");
    setSelectedUpiOption("");
    setNetBanking("");
    setUpiId("");
    setMobileNumber("");

    if (method !== "card") {
      setCardDetails({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // const [totAmount, setTotAmount] = useState(total_amount);

  return (
    <>
      <Header />
      {hasPass && total_amount === 0 ? (
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "50vh",
            height: "4rem",
            width: "10rem",
            backgroundColor: "wheat",
            fontSize: "1rem",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
          onClick={handleMakePayment}
        >
          Book Ticket
        </button>
      ) : (
        <div className="payment-page">
          <div className="payment-options">
            <h2 className="payment-heading">Payment Options</h2>
            <ul>
              <li
                className={
                  selectedPaymentMethod === "card" ? "selected-payment" : ""
                }
                onClick={() => handlePaymentMethodChange("card")}
              >
                Credit/Debit Card
              </li>
              <li
                className={
                  selectedPaymentMethod === "upi" ? "selected-payment" : ""
                }
                onClick={() => handlePaymentMethodChange("upi")}
              >
                UPI
              </li>
              <li
                className={
                  selectedPaymentMethod === "netBanking"
                    ? "selected-payment"
                    : ""
                }
                onClick={() => handlePaymentMethodChange("netBanking")}
              >
                Net Banking
              </li>
            </ul>
          </div>
          <div className="payment-details">
            {selectedPaymentMethod === "card" && (
              <div>
                <h3>Enter Your Card Details</h3>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card"
                  value={cardDetails.cardName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  required
                />
                <button onClick={handleMakePayment}>Make Payment</button>
              </div>
            )}
            {selectedPaymentMethod === "upi" && (
              <div>
                <h3>UPI Options</h3>
                <ul>
                  <li
                    className={selectedUpiOption === "Cred" ? "selected" : ""}
                    onClick={() => setSelectedUpiOption("Cred")}
                  >
                    Cred UPI
                  </li>
                  <li
                    className={
                      selectedUpiOption === "Amazonpay" ? "selected" : ""
                    }
                    onClick={() => setSelectedUpiOption("Amazonpay")}
                  >
                    Amazon Pay
                  </li>
                  <li
                    className={selectedUpiOption === "Paytm" ? "selected" : ""}
                    onClick={() => setSelectedUpiOption("Paytm")}
                  >
                    Paytm
                  </li>
                  <li
                    className={selectedUpiOption === "GPay" ? "selected" : ""}
                    onClick={() => setSelectedUpiOption("GPay")}
                  >
                    GPay
                  </li>
                  <li
                    className={
                      selectedUpiOption === "PhonePe" ? "selected" : ""
                    }
                    onClick={() => setSelectedUpiOption("PhonePe")}
                  >
                    PhonePe
                  </li>
                </ul>
                {selectedUpiOption && (
                  <div>
                    <input
                      type="text"
                      placeholder={`Enter ${selectedUpiOption} UPI ID`}
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      required
                    />
                    <button onClick={handleMakePayment}>Make Payment</button>
                  </div>
                )}
              </div>
            )}
            {selectedPaymentMethod === "netBanking" && (
              <div>
                <h3>Select Your Bank</h3>
                <ul>
                  <li
                    className={netBanking === "sbi" ? "selected" : ""}
                    onClick={() => setNetBanking("sbi")}
                  >
                    SBI Bank
                  </li>
                  <li
                    className={netBanking === "hdfc" ? "selected" : ""}
                    onClick={() => setNetBanking("hdfc")}
                  >
                    HDFC Bank
                  </li>
                  <li
                    className={netBanking === "icici" ? "selected" : ""}
                    onClick={() => setNetBanking("icici")}
                  >
                    ICICI Bank
                  </li>
                  <li
                    className={netBanking === "axis" ? "selected" : ""}
                    onClick={() => setNetBanking("axis")}
                  >
                    Axis Bank
                  </li>
                </ul>
                {netBanking && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                    <button onClick={handleMakePayment}>Make Payment</button>
                  </div>
                )}
              </div>
            )}
            {paymentSuccess && <h3>Payment Successful!</h3>}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
