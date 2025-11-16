import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-column">
          <h3 className="footer-title">About FoodSaver</h3>
          <p className="footer-text">
            FoodSaver connects restaurants with NGOs to reduce food waste and feed those in need.
            Together, we create a sustainable and hunger-free future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/works" className="footer-link">How It Works</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="footer-column">
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Facebook" className="social-icon"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn" className="social-icon"><i className="fab fa-linkedin"></i></a>
          </div>
          <li><Link to="/contribute" className="footer-link">Contribute</Link></li>
        </div>

        {/* Partner Logos */}
        <div className="footer-column">
          <h3 className="footer-title">Our Partners</h3>
          <div className="footer-logos">
            <img src="/images/WEST-BENGAL-GOVERNMENT.webp" alt="Government of West Bengal" className="footer-logo" />
            <img src="/images/HIT-Haldia-Logo.webp" alt="HIT Haldia" className="footer-logo" />
            <img src="https://www.shutterstock.com/shutterstock/photos/1867730668/display_1500/stock-vector-ngo-earth-planet-hands-palm-care-icon-vector-non-governmental-organization-conceptual-symbol-1867730668.jpg" alt="NGO" className="footer-logo" />
          </div>
        </div>

        {/* Newsletter Section */ }
        <div className="footer-column">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-text">
            Subscribe to our newsletter to receive updates on new features & community impact.
          </p>

          <div className="newsletter-box">
            <input 
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FoodSaver. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
