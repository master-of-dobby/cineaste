import React, { useEffect, useState } from "react";
import "./Payment.css";
import Header from "./HomePageFiles/Header";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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

  // console.log(hasPass);
  // console.log(seats_selected);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentSuccess(false);
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

  const navigate = useNavigate();

  const handleMakePayment = () => {
    if (selectedPaymentMethod === "card") {
      const { cardNumber, cardName, expiryDate, cvv } = cardDetails;
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert("Please fill out all credit card details.");
        return;
      }
      setTotAmount(0);
    }

    if (selectedPaymentMethod === "upi" && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    // if(selectedPaymentMethod ==)

    if (selectedPaymentMethod === "netBanking") {
      if (!netBanking) {
        alert("Please select a bank.");
        return;
      }
      if (!mobileNumber) {
        alert("Please enter your mobile number.");
        return;
      }

      if (netBanking || mobileNumber) {
        setTotAmount(0);
      }
    }

    setTimeout(() => {
      setPaymentSuccess(true);
      setTotAmount(0); // Reset total amount to 0
    }, 1000); // Simulating a delay for the payment process
    return navigate("/paymentSucceeded", {
      state: {
        hasPass: hasPass,
        total_amount: totAmount,
        seats_selected: seats_selected,
        show_id: show_id,
        theatre_name: theatre_name,
        theatre_location: theatre_location,
        show_time: show_time,
      },
      replace: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // total amount
  const [totAmount, setTotAmount] = useState(total_amount);

  return (
    <>
      <Header />
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
                selectedPaymentMethod === "netBanking" ? "selected-payment" : ""
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
                  className={selectedUpiOption === "PhonePe" ? "selected" : ""}
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
    </>
  );
};

export default PaymentPage;
