import React from "react";
import loginImage from "../common/login-reg.jpeg"; // Import the image
import "../index.css";

function Login() {
  return (
    <div className="login">
      <div className="login-theme">
        <img src={loginImage} alt="login-theme"></img>
      </div>
      <div className="login-form">
        <div className="login-title">
          <h1>CINEASTE</h1>
        </div>
        <div className="login-label">
          <h1>Login</h1>
        </div>

        <div>
          <form className="login-form-content">
            {/* <label>Email</label> */}
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
            <a href="./register" className="sign-up-btn">Sign Up</a>
            <button className="submit-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
