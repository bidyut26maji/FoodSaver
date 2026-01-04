import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="content-wrapper">
      {/* Back to Home Button */}
      <Link to="/" className="about-back-btn">
        ⬅ Back to Home
      </Link>

      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About FoodShare Connect</h1>
          <h2 className="about-hero-subtitle">
            Connecting restaurants with NGOs to reduce food waste and feed communities.
          </h2>
        </div>
        <Link to="/works" className="about-cta-btn">
          <span>Learn More</span>
        </Link>
      </div>

      {/* Content Sections */}
      <div className="about-content">
        <h2 className="about-section-title">Our Story</h2>
        <p className="about-section-text">
          FoodShare Connect was born from a simple idea: to bridge the gap between surplus food and those in need. 
          Founded by students at Haldia Institute of Technology, we recognized the significant food waste in our 
          community and the potential to make a difference. Our journey began with a passion for sustainability 
          and a commitment to creating a positive impact. We've grown from a campus initiative to a platform 
          serving restaurants and NGOs across the region, driven by our belief that no food should go to waste 
          while people go hungry.
        </p>

        <h2 className="about-section-title">Our Mission & Values</h2>
        <p className="about-section-text">
          Our mission is to create a sustainable ecosystem where food waste is minimized and communities are 
          nourished. We believe in the power of technology to solve real-world problems and are committed to 
          transparency, efficiency, and impact measurement. Our values include environmental responsibility, 
          social equity, and community collaboration.
        </p>

        <h2 className="about-section-title">The Team</h2>
        <p className="about-section-text">
          Our team consists of passionate students and professionals dedicated to making a difference. 
          We come from diverse backgrounds in technology, business, and social work, united by our 
          commitment to solving the food waste challenge. Together, we're building a platform that 
          connects communities and creates lasting impact.
        </p>

        <h2 className="about-section-title">Our Impact</h2>
        <p className="about-section-text">
          Since our launch, we've facilitated the donation of thousands of meals, connecting hundreds 
          of restaurants with local NGOs. Our platform has helped reduce food waste while ensuring 
          that nutritious meals reach those who need them most. We're proud of our impact and committed 
          to scaling our solution to serve more communities.
        </p>
      </div>
    </div>
  );
};

export default About;
