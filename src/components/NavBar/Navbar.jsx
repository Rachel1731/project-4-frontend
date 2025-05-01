import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-home">
        <Link to="/home">Page & Picture</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/source-page">Source Page</Link>
        </li>
        <li>
          <Link to="/comments">Leave a Comment</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
