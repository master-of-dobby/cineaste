import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./Components/Register";
import Login from "./Components/Login";
import Redirect from "./Components/Redirect";
import Homepage from "./Components/Homepage";
import Movies from "./Components/Movies";
import UserProfile from "./Components/UserProfile";
import Booking from "./Components/Booking";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/redirect/:email/:otp" Component={Redirect}/>
          <Route path="/home" Component={Homepage}/>
          <Route path="/movies" Component={Movies}/>
          <Route path="/profile" Component={UserProfile}/>
          <Route path="/bookings" Component={Booking}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
