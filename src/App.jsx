import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/NavBar/Navbar.jsx";
import Home from "./components/Home/home.jsx";

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;

