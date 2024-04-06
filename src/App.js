import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Redirect from "./Components/Redirect";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Login}></Route>
          <Route path="/register" Component={Registration}></Route>
          <Route path="/redirect/:email/:otp" Component={Redirect}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
