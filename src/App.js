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
import MovieDetail from "./Components/MovieDetail";
import TheatreList from "./Components/TheatreList";
import AddMovie from "./Components/AddMovies/AddMovie";

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
          <Route path="/movies/movie-detail/:movieId" Component={MovieDetail}></Route>
          <Route path="/theatres-list/:movieId" Component={TheatreList}></Route>
          <Route path="/add-movie" Component={AddMovie}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
