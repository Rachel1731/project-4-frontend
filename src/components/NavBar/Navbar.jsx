import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-home">
        <NavLink to="/home">Page & Picture</NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/source-page">Source Page</NavLink>
        </li>
        <li>
          <NavLink to="/comments">Leave a Comment</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
