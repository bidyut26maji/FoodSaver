import React from 'react';
import { Link } from 'react-router-dom';

const Restaurant = () => {
  const benefits = [
    'Reduce food waste and operational costs',
    'Contribute to community welfare and social responsibility',
    'Enhance brand reputation and customer loyalty',
    'Easy-to-use platform with minimal setup time',
    'Track your impact and receive detailed reports',
    'Connect with local NGOs and community organizations'
  ];

  const features = [
    {
      title: 'Easy Listing',
      description: 'List surplus food items in minutes with our simple interface',
      icon: '📝'
    },
    {
      title: 'Real-time Updates',
      description: 'Get instant notifications when NGOs are interested in your donations',
      icon: '🔔'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Set pickup times that work with your restaurant schedule',
      icon: '⏰'
    },
    {
      title: 'Impact Tracking',
      description: 'See the real impact of your donations with detailed analytics',
      icon: '📊'
    }
  ];

  return (
    <div className="content-wrapper">
      {/* Back to Home Button */}
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
          onMouseOver={(e) => e.target.style.backgroundColor = '#7bcc9b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#94e0b2'}
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
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          marginBottom: '40px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
          <h1
            style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: '900',
              lineHeight: '1.25',
              letterSpacing: '-0.033em'
            }}
          >
            For Restaurants
          </h1>
          <h2 style={{ color: 'white', fontSize: '1rem', fontWeight: '400', lineHeight: '1.5' }}>
            Turn your surplus food into community impact. Join hundreds of restaurants making a difference.
          </h2>
        </div>
        <Link to="/registration" style={{
          display: 'flex',
          minWidth: '84px',
          maxWidth: '480px',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '12px',
          height: '48px',
          padding: '0 20px',
          backgroundColor: '#38e07b',
          color: '#0e1a13',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: 'normal',
          letterSpacing: '0.015em',
          textDecoration: 'none'
        }}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Get Started</span>
        </Link>
      </div>

      {/* Benefits Section */}
      <div style={{ padding: '0 16px', marginBottom: '40px' }}>
        <h2
          style={{
            color: '#0e1a13',
            fontSize: '28px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          Why Join FoodSaver?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                backgroundColor: '#e8f2ec',
                borderRadius: '8px',
                border: '1px solid #daeded'
              }}
            >
              <p style={{ color: '#0e1a13', fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                ✓ {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '0 16px', marginBottom: '40px' }}>
        <h2
          style={{
            color: '#0e1a13',
            fontSize: '28px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          Platform Features
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                backgroundColor: '#f8fbfa',
                borderRadius: '12px',
                border: '1px solid #daeded',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  color: '#0e1a13',
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '12px'
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: '#51946c',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: 0
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ padding: '0 16px', marginBottom: '40px' }}>
        <h2
          style={{
            color: '#0e1a13',
            fontSize: '28px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          How It Works for Restaurants
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                backgroundColor: '#38e07b',
                borderRadius: '50%',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0e1a13',
                flexShrink: 0
              }}
            >
              1
            </div>
            <div>
              <h3 style={{ color: '#0e1a13', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                Sign Up
              </h3>
              <p style={{ color: '#51946c', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                Create your restaurant profile in minutes. Provide basic information about your establishment.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                backgroundColor: '#38e07b',
                borderRadius: '50%',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0e1a13',
                flexShrink: 0
              }}
            >
              2
            </div>
            <div>
              <h3 style={{ color: '#0e1a13', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                List Surplus Food
              </h3>
              <p style={{ color: '#51946c', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                When you have surplus food, simply list it on our platform with details like type, quantity, and pickup time.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                backgroundColor: '#38e07b',
                borderRadius: '50%',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0e1a13',
                flexShrink: 0
              }}
            >
              3
            </div>
            <div>
              <h3 style={{ color: '#0e1a13', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                Coordinate Pickup
              </h3>
              <p style={{ color: '#51946c', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                NGOs will contact you to arrange pickup. Coordinate the details and hand over the food.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                backgroundColor: '#38e07b',
                borderRadius: '50%',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0e1a13',
                flexShrink: 0
              }}
            >
              4
            </div>
            <div>
              <h3 style={{ color: '#0e1a13', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                Track Impact
              </h3>
              <p style={{ color: '#51946c', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                Monitor your impact through our dashboard. See how many meals you've helped provide to the community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ textAlign: 'center', padding: '40px 16px' }}>
        <h2
          style={{
            color: '#0e1a13',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '24px'
          }}
        >
          Ready to Make a Difference?
        </h2>
        <p
          style={{
            color: '#51946c',
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}
        >
          Join hundreds of restaurants already making an impact in their communities.
        </p>
        <Link
          to="/restaurant-dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '16px 32px',
            backgroundColor: '#38e07b',
            color: '#0e1a13',
            fontWeight: '700',
            fontSize: '18px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2bc066'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#38e07b'}
        >
          Start Donating Today
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
