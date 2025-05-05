import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="navbar">
      <div className="navbar-home">
        <NavLink to="/home" onClick={toggleMenu}>Page & Picture</NavLink>
      </div>
      <span
        className="material-icons menu-icon"
        onClick={toggleMenu}
        style={{ cursor: "pointer"}}
      >
        menu
      </span>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/books" onClick={toggleMenu}>Books</NavLink>
        </li>
        <li>
          <NavLink to="/movies"onClick={toggleMenu}>Movies</NavLink>
        </li>
        <li>
          <NavLink to="/source-page"onClick={toggleMenu}>Source Page</NavLink>
        </li>
        <li>
          <NavLink to="/comments"onClick={toggleMenu}>Leave a Comment</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
