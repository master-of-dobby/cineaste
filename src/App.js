import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Redirect from "./Components/Redirect";
import Homepage from "./Components/Homepage";
import Movies from "./Components/Movies";
import MovieDetail from "./Components/MovieDetail";
import TheatreList from "./Components/TheatreList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route path="/register" Component={Registration} />
          <Route path="/redirect/:email/:otp" Component={Redirect} />
          <Route path="/homepage" Component={Homepage} />
          <Route path="/movies" Component={Movies} />
          <Route path="/movies/movie-detail/:movieId" Component={MovieDetail}></Route>
          <Route path="/theatres-list/:movieId" Component={TheatreList}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
