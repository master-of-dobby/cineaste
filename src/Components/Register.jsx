import "../index.css";
import React, { useState } from "react";
import loginImage from "../Assets/login-reg.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/user/register", formData);
      //alert("User registered successfully!");
      navigate("/", "/login");
    } catch (err) {
      console.error("Registration Failed ", err);
    }
  };

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
          <form className="login-form-content" onSubmit={handleSubmit}>
            {/* <label>Email</label> */}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              required
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              required
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={handleChange}
            />
            <br />
            {/* <label>Password</label> */}
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              required
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              required
              onChange={handleChange}
            />{" "}
            <br />
            <div className="button-container">
              <button className="submit-btn" type="submit">
                Register
              </button>
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

export default Register;
