import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // ✨ Animation library

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

  return (
    <div className="content-wrapper">
      {/* Back to Home */}
      <div style={{ padding: '12px 16px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: '#94e0b2',
            color: '#101914',
            fontWeight: 'bold',
            fontSize: '14px',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'background-color 0.3s'
          }}
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div
        style={{
          display: 'flex',
          minHeight: '400px',
          flexDirection: 'column',
          gap: '24px',
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          marginBottom: '40px'
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: '900',
            textAlign: 'center'
          }}
        >
          How FoodSaver Works
        </h1>
        <p
          style={{
            color: 'white',
            fontSize: '1rem',
            textAlign: 'center',
            maxWidth: '600px'
          }}
        >
          A simple 5-step process to connect surplus food with those who need it most.
        </p>
      </div>

      {/* Animated Steps Section */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
          {stepsData.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                gap: '24px',
                padding: '24px',
                backgroundColor: '#f8fbfa',
                borderRadius: '12px',
                border: '1px solid #daeded',
                alignItems: 'flex-start',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'box-shadow 0.3s'
              }}
            >
              <motion.div
                initial={{ rotate: -15, scale: 0.8 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 120 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#38e07b',
                  borderRadius: '50%',
                  fontSize: '24px',
                  flexShrink: 0
                }}
              >
                {step.icon}
              </motion.div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#0e1a13',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    {step.step}
                  </span>
                  <h3 style={{ color: '#0e1a13', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                    {step.title}
                  </h3>
                </div>
                <p style={{ color: '#51946c', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
     
   
  

        {/* Benefits Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2
            style={{
              color: '#0e1a13',
              fontSize: '28px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            Benefits for Everyone
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', backgroundColor: '#e8f2ec', borderRadius: '12px' }}>
              <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                For Restaurants
              </h3>
              <ul style={{ color: '#51946c', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Reduce food waste and costs</li>
                <li>Contribute to community welfare</li>
                <li>Enhance brand reputation</li>
                <li>Easy-to-use platform</li>
              </ul>
            </div>
            <div style={{ padding: '24px', backgroundColor: '#e8f2ec', borderRadius: '12px' }}>
              <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                For NGOs
              </h3>
              <ul style={{ color: '#51946c', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Access to quality food donations</li>
                <li>Efficient coordination system</li>
                <li>Expand community reach</li>
                <li>Track impact and donations</li>
              </ul>
            </div>
            <div style={{ padding: '24px', backgroundColor: '#e8f2ec', borderRadius: '12px' }}>
              <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                For Communities
              </h3>
              <ul style={{ color: '#51946c', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Access to nutritious meals</li>
                <li>Reduced food insecurity</li>
                <li>Environmental benefits</li>
                <li>Stronger community bonds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2
            style={{
              color: '#0e1a13',
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '24px'
            }}
          >
            Ready to Get Started?
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/restaurant"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: '#38e07b',
                color: '#0e1a13',
                fontWeight: '700',
                fontSize: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2bc066'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#38e07b'}
            >
              For Restaurants
            </Link>
            <Link
              to="/ngo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: '#0e1a13',
                color: 'white',
                fontWeight: '700',
                fontSize: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1a2b1f'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#0e1a13'}
            >
              For NGOs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
