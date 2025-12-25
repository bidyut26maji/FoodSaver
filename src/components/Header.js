import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={`main-header ${isSticky ? 'sticky' : ''}`}>
      <div className="header-container">
        <div className="logo-group">
          <div className="logo-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="logo-text">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              FoodSaver
            </Link>
          </h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link className={`nav-link ${isActive('/about')}`} to="/about">
            About
          </Link>
          <Link className={`nav-link ${isActive('/works')}`} to="/works">
            How it Works
          </Link>
          
          {/* Dropdown Menu */}
          <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <button className="dropdown-toggle" aria-expanded={isDropdownOpen}>
              Services
              <svg className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} width="12" height="8" viewBox="0 0 12 8">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
              <Link className={`dropdown-item ${isActive('/restaurant')}`} to="/restaurant">
                For Restaurants
              </Link>
              <Link className={`dropdown-item ${isActive('/ngo')}`} to="/ngo">
                For NGOs
              </Link>
            </div>
          </div>
          
          <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
            Contact
          </Link>
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* CTA Button */}
        <Link to="/registration" className="cta-button">
          <span className="cta-text">Get Started</span>
        </Link>

        {/* Mobile Hamburger */}
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <Link className={`mobile-nav-link ${isActive('/about')}`} to="/about">
          About
        </Link>
        <Link className={`mobile-nav-link ${isActive('/works')}`} to="/works">
          How it Works
        </Link>
        <Link className={`mobile-nav-link ${isActive('/restaurant')}`} to="/restaurant">
          For Restaurants
        </Link>
        <Link className={`mobile-nav-link ${isActive('/ngo')}`} to="/ngo">
          For NGOs
        </Link>
        <Link className={`mobile-nav-link ${isActive('/contact')}`} to="/contact">
          Contact
        </Link>
        
        {/* Theme Toggle in Mobile Menu */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <ThemeToggle />
        </div>
        
        <Link to="/registration" className="mobile-cta-button">
          Get Started
        </Link>
      </nav>
    </header>
  );
};

export default Header;
