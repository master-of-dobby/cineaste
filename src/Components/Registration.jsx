import "../index.css";
import React from "react";
import loginImage from "../common/login-reg.jpeg";
import { Link } from 'react-router-dom';

function Registration() {
  return (
    <div className="login">
      <div className="login-theme">
        <img src={loginImage} alt="login-theme"></img>
      </div>
      <div className="register-form">
        <div className="login-title">
          <h1>CINEASTE</h1>
        </div>
        <div className="login-label">
          <h1>Register</h1>
        </div>

        <div>
          <form className="login-form-content">
            {/* <label>Email</label> */}
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
            />{" "}
            <br />
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
            />{" "}
            <br />
            <input type="email" name="email" placeholder="Email" required />
            <br />
            {/* <label>Password</label> */}
            <input
              type="text"
              name="password"
              placeholder="Password"
              required
            />
            <br />
            <input
              type="text"
              name="firstname"
              placeholder="Location"
              required
            />{" "}
            <br />
            <div className="button-container">
              <button className="submit-btn" type="submit">Register</button> 
              <Link to="/">
                <button className="submit-btn">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
