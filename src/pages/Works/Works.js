import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Works.css';

const Works = () => {
  const stepsData = [
    {
      title: 'Restaurants List Surplus Food',
      description: 'Restaurants can easily list their surplus food items through our user-friendly interface. They specify the type of food, quantity, and pickup time.',
      icon: '🍽️',
      step: '1'
    },
    {
      title: 'NGOs Browse Available Donations',
      description: 'NGOs can browse through available food donations in their area, filter by food type, quantity, and pickup time.',
      icon: '🔍',
      step: '2'
    },
    {
      title: 'Coordinate Pickup',
      description: 'Once an NGO selects a donation, they coordinate with the restaurant for pickup time and location.',
      icon: '🚚',
      step: '3'
    },
    {
      title: 'Food Distribution',
      description: 'NGOs distribute the collected food to those in need, ensuring it reaches the community efficiently.',
      icon: '🤝',
      step: '4'
    },
    {
      title: 'Impact Tracking',
      description: 'Our platform tracks the amount of food saved and meals donated, providing transparency and demonstrating collective impact.',
      icon: '📊',
      step: '5'
    }
  ];

  const benefits = [
    {
      title: 'For Restaurants',
      items: ['Reduce food waste and costs', 'Contribute to community welfare', 'Enhance brand reputation', 'Easy-to-use platform'],
      icon: '🏪'
    },
    {
      title: 'For NGOs',
      items: ['Access to quality food donations', 'Efficient coordination system', 'Expand community reach', 'Track impact and donations'],
      icon: '🤲'
    },
    {
      title: 'For Communities',
      items: ['Access to nutritious meals', 'Reduced food insecurity', 'Environmental benefits', 'Stronger community bonds'],
      icon: '🌍'
    }
  ];

  return (
    <div className="works-page">
      {/* Animated Background Particles */}
      <div className="works-orbs-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="works-orb"
            initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) }}
            animate={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{ 
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>

      <div className="works-content-wrapper">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="works-back-button-wrapper"
        >
          <button
            onClick={() => window.history.back()}
            className="works-back-button"
          >
            <span>←</span> Back to Home
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="works-hero"
        >
          <div className="works-hero-bg-image" />
          <div className="works-hero-bg-gradient" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="works-hero-content"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="works-hero-icon"
            >
              ⚡
            </motion.div>
            <h1 className="works-hero-title">
              How FoodSaver Works
            </h1>
            <p className="works-hero-subtitle">
              A seamless 5-step process connecting surplus food with those who need it most
            </p>
          </motion.div>
        </motion.div>

        {/* Steps Section */}
        <div className="works-steps-section">
          {stepsData.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="works-step-wrapper"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="works-step-card"
              >
                
                <div className="works-step-bg-gradient" />

                
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="works-step-icon-wrapper"
                >
                  {step.icon}
                  <div className="works-step-number">
                    {step.step}
                  </div>
                </motion.div>

                <div className="works-step-content">
                  <h3 className="works-step-title">
                    {step.title}
                  </h3>
                  <p className="works-step-description">
                    {step.description}
                  </p>
                </div>

                
                {index < stepsData.length - 1 && (
                  <div className="works-step-connector" />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="works-benefits-section"
        >
          <div className="works-benefits-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="works-benefits-title"
            >
              Benefits for Everyone
            </motion.h2>
            <p className="works-benefits-subtitle">
              Creating positive impact across all stakeholders
            </p>
          </div>

          <div className="works-benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                className="works-benefit-card"
              >
                <div className="works-benefit-card-top-bar" />
                
                <div className="works-benefit-header">
                  <div className="works-benefit-icon">
                    {benefit.icon}
                  </div>
                  <h3 className="works-benefit-title">
                    {benefit.title}
                  </h3>
                </div>

                <ul className="works-benefit-list">
                  {benefit.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + i * 0.05 }}
                      viewport={{ once: true }}
                      className="works-benefit-item"
                    >
                      <div className="works-benefit-bullet" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="works-cta-section"
        >
          <div className="works-cta-bg-glow" />
          
          <div className="works-cta-content">
            <h2 className="works-cta-title">
              Ready to Make an Impact?
            </h2>
            <p className="works-cta-description">
              Join our community and start making a difference today
            </p>

            <div className="works-cta-buttons-wrapper">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="works-btn-restaurant"
              >
                🏪 For Restaurants
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="works-btn-ngo"
              >
                🤲 For NGOs
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Works;