import React, { useState } from "react";
import loginImage from "../Assets/login-reg.jpeg"; // Import the image
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateCred = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/login`, {
        email: email,
        password: password,
      });
      console.log("Login Successfull", response);
    } catch (err) {
      setError(err.response || "An error occured");
      console.log("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

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
          <form className="login-form-content" onSubmit={validateCred}>
            {/* <label>Email</label> */}
            <input
              value={email}
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            {/* <label>Password</label> */}
            <input
              type="text"
              value={password}
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            {/* <a href="./register" className="sign-up-btn">Sign Up</a> */}
            <div className="button-container">
              <button className="submit-btn" type="submit" disabled={loading}>
                {/* {loading ? "Logging in..." : "Login"} */}
                Login
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Link to="./register">
                <button className="submit-btn">Register</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
