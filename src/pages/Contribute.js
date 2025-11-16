import React from 'react';
import '../css/Contribute.css'; // Make sure this path is correct
import { 
  FaLeaf, 
  FaHeart, 
  FaHandsHelping, 
  FaUsers, 
  FaCode, 
  FaCheckCircle 
} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // 1. Import Link

const Contribute = () => {
  return (
    <div className="contribute-wrapper">
      <div className="contribute-container">
        
        {/* --- Header Section --- */}
        <header className="contribute-header">
          <h1>
            <FaLeaf className="logo-icon" />
            Foodsaver Initiative
          </h1>
          <p className="subtitle">
            Connecting communities to reduce food waste and fight hunger.
            Our platform links restaurants with surplus food to NGOs in need.
          </p>
        </header>

        {/* --- Mission Section --- */}
        <section className="mission-section">
          <h2>Join Our Mission</h2>
          <p>
            There are many ways you can help support our cause. Get involved
            and make a tangible difference in your community.
          </p>
          <div className="button-group">
            
            <Link to="/donate" className="btn btn-donate">
              <FaHeart /> Donate
            </Link>
            
            <Link to="/support" className="btn btn-support">
              <FaHandsHelping /> Support
            </Link>
            
            <Link to="/team" className="btn btn-team">
              <FaUsers /> Team
            </Link>
            
            <Link to="/contributors" className="btn btn-open-source">
              <FaCode /> Open Source
            </Link>
            
          </div>
        </section>

        {/* --- Partner CTA Section --- */}
        <section className="partner-cta">
          <div className="cta-text">
            <h3>Become a Verified Partner</h3>
            <p>
              Join our network of trusted restaurants and NGOs. Get verified to
              increase your impact and gain access to exclusive platform features.
            </p>
          </div>
          <div className="cta-button-container">
            
            {/* 4. Changed <button> to <Link> here as well */}
            <Link to="/verify" className="btn btn-verify">
              <FaCheckCircle /> Get Verified Now
            </Link>
            
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contribute;