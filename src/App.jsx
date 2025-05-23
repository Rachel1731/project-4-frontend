import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/NavBar/Navbar.jsx";
import Home from "./components/Home/home.jsx";
import Movies from "./components/Movies/movies.jsx";
import Books from "./components/Books/books.jsx";
import Add from "./components/Add/source.jsx";
import Comments from "./components/comments/comments.jsx";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/books" element={<Books />} />
        <Route path="/source-page" element={<Add />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </Router>
  );
};

export default App;
