import React from 'react';
import { Link } from 'react-router-dom';
import useTypewriter from '../hooks/useTypewriter';
import CountUp from 'react-countup';

const Home = () => {
  const typewriterTexts = ["Connecting Restaurants...", "Feeding the Hungry...", "Saving Surplus Food..."];
  const typewriterText = useTypewriter(typewriterTexts, 100);

  const statsData = [
    { label: 'Food Saved', value: '1,500 kg' },
    { label: 'Meals Donated', value: '75,000' },
    { label: 'Partners', value: '200+' },
  ];

  const stepsData = [
    {
      title: 'Restaurants Donate',
      description: 'Restaurants easily list their surplus food available for donation through our user-friendly interface.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M220.2,100l-18-31.18a28,28,0,0,0-47.3-1.92L139.56,40.31a28,28,0,0,0-48.12-.63,28,28,0,0,0-43,34.78l3.34,5.79a28,28,0,0,0-22,41.92l38,65.82a87.46,87.46,0,0,0,53.43,41,88.56,88.56,0,0,0,22.92,3A88,88,0,0,0,220.2,100Zm-6.67,62.63A72,72,0,0,1,81.63,180l-38-65.82a12,12,0,0,1,20.79-12l22,38.1a8,8,0,1,0,13.85-8l-38-65.81a12,12,0,0,1,13.5-17.59,11.9,11.9,0,0,1,7.29,5.59l34,58.89a8,8,0,0,0,13.85-8l-26-45h0a12,12,0,0,1,20.78-12L160,107.78a48.08,48.08,0,0,0-11,61,8,8,0,0,0,13.86-8,32,32,0,0,1,11.71-43.71,8,8,0,0,0,2.93-10.93l-10-17.32a12,12,0,0,1,20.78-12l18,31.18A71.49,71.49,0,0,1,213.53,162.62ZM184.27,29.93a8,8,0,0,1,9.8-5.66c15.91,4.27,29,14.11,36.86,27.73a8,8,0,0,1-13.86,8c-5.72-9.92-15.36-17.12-27.14-20.27A8,8,0,0,1,184.27,29.93ZM80.91,237a8,8,0,0,1-11.24,1.33c-11-8.69-20.11-19.58-28.6-34.28a8,8,0,0,1,13.86-8c7.44,12.88,15.27,22.32,24.65,29.72A8,8,0,0,1,80.91,237Z" />
        </svg>
      )
    },
    {
      title: 'NGOs Collect',
      description: 'NGOs can browse available donations and coordinate pickups, ensuring efficient food distribution.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
        </svg>
      )
    },
    {
      title: 'Impact is Measured',
      description: 'We track the amount of food saved and meals donated, providing transparency and demonstrating the collective impact.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z" />
        </svg>
      )
    },
  ];

  const testimonialsData = [
    {
      quote: '"FoodSaver has made it incredibly easy for us to donate our surplus food. It\'s a win-win!"',
      author: '- Sarah Chen, Restaurant Owner',
      imageClass: 'testimonial-image-1'
    },
    {
      quote: '"Thanks to FoodSaver, we\'ve been able to provide more meals to those in need. It\'s a fantastic initiative."',
      author: '- David Lee, NGO Coordinator',
      imageClass: 'testimonial-image-2'
    }
  ];

  return (
    <div className="content-wrapper">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-card">
          <div className="hero-text-content">
            <h1 className="hero-title">Connect, Reduce, Impact</h1>
            <h2 className="hero-subtitle">
              <div className="typewriter">{typewriterText}</div>
              <p className="he">
                Join FoodSaver, the platform that connects restaurants with NGOs to minimize food waste and feed those in need. Together, we can make a difference.
              </p>
            </h2>
          </div>
          <Link to="/registration" className="cta-button final-cta-button">
            <span className="cta-text">Get Started</span>
          </Link>
        </div>
      </div>

    <div className="stats-section">
  {statsData.map((stat, index) => (
    <div key={index} className="stat-card">
      <div className="stat-icon">
        {index === 0 && <i className="fas fa-utensils"></i>}
        {index === 1 && <i className="fas fa-hand-holding-heart"></i>}
        {index === 2 && <i className="fas fa-users"></i>}
      </div>
      <p className="stat-value">
  <CountUp end={parseInt(stat.value.replace(/\D/g, ''))} duration={2} /> {stat.value.includes('kg') ? 'kg' : ''}
</p>
      <p className="stat-label">{stat.label}</p>
    </div>
  ))}
</div>


      {/* How It Works Section */}
      <div className="how-it-works-section">
        <div className="section-header">
          <h1 className="section-title">How FoodSaver Works</h1>
          <p className="section-subtitle">
            Our platform simplifies the process of connecting restaurants with NGOs, ensuring surplus food reaches those who need it most.
          </p>
          <Link to="/works" className="cta-button section-cta-button">
            <span className="cta-text">Learn More</span>
          </Link>
        </div>
        <div className="steps-grid">
          {stepsData.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <div className="step-text">
                <h2 className="step-title">{step.title}</h2>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <h2 className="testimonials-heading">Testimonials</h2>
      <div className="testimonials-carousel">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className={testimonial.imageClass}></div>
            <div>
              <p className="testimonial-text">{testimonial.quote}</p>
              <p className="testimonial-author">{testimonial.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h1 className="cta-title">Ready to Make a Difference?</h1>
        </div>
        <div className="cta-button-container">
          <Link to="/registration" className="cta-button final-cta-button">
            <span className="cta-text">Get Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;