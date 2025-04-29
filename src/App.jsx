import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/NavBar/Navbar.jsx";
import Home from "./components/Home/home.jsx";
import Movies from "./components/Movies/movies.jsx";
import Books from "./components/Books/books.jsx";

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
};

export default App;

