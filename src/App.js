import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Redirect from "./Components/Redirect";
import Homepage from "./Components/Homepage";
import Movies from "./Components/Movies";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Login}/>
          <Route path="/register" Component={Registration}/>
          <Route path="/redirect/:email/:otp" Component={Redirect}/>
          <Route path="/Homepage" Component={Homepage}/>
          <Route path="/Movies" Component={Movies}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
