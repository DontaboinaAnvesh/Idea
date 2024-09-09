import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import { useAuth } from '../AuthContext'; // Import useAuth to access logout function
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility
  const { logout } = useAuth(); // Destructure the logout function from the auth context
  const navigate = useNavigate(); // Hook to navigate programmatically
  const logoText = 'Ideology'; // Your logo text

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state
  };

  const handleLogout = () => {
    logout(); // Call logout function to clear user data
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="header-container">
      <div className="logo">
        <h1>
          {logoText.split('').map((char, index) => (
            <span key={index} className={`letter letter-${index}`}>
              {char}
            </span>
          ))}
        </h1>
      </div>

      <div className="nav-container">
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/ideas-submit">Ideas</Link></li>
            <li><Link to="/ideas-gallery">Gallery</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
    </div>
  );
};

export default Header;
