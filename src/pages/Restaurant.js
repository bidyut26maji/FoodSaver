import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Restaurant.css';

const Restaurant = () => {
  // SEO optimization
  useEffect(() => {
    document.title = 'Restaurant Food Donation Platform | FoodSaver - Reduce Waste, Feed Communities';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join FoodSaver\'s restaurant food donation platform. Reduce food waste, help communities, get tax benefits. Safe food handling guidelines, legal protection, and easy pickup coordination.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Join FoodSaver\'s restaurant food donation platform. Reduce food waste, help communities, get tax benefits. Safe food handling guidelines, legal protection, and easy pickup coordination.';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    
    // Add keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'restaurant food donation, food waste reduction, safe food handling, Good Samaritan Act, tax benefits, community impact, surplus food, food safety guidelines');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'restaurant food donation, food waste reduction, safe food handling, Good Samaritan Act, tax benefits, community impact, surplus food, food safety guidelines';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, []);
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
      <div className="restaurant-page">
        <Link to="/" className="restaurant-back-btn">
          ⬅ Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="restaurant-hero">
        <div className="restaurant-hero-content">
          <h1 className="restaurant-hero-title">For Restaurants</h1>
          <h2 className="restaurant-hero-subtitle">
            Turn your surplus food into community impact. Join hundreds of restaurants making a difference.
          </h2>
        </div>
        <Link to="/registration" className="cta-btn-primary">
          <span>Get Started</span>
        </Link>
      </div>

      {/* Benefits Section */}
      <div className="restaurant-benefits-section">
        <h2 className="restaurant-section-heading">
          Why Join FoodSaver?
        </h2>
        <div className="restaurant-benefits-grid">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="restaurant-benefit-card"
            >
              <p className="restaurant-benefit-text">
                ✓ {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="restaurant-features-section">
        <h2 className="restaurant-section-heading">
          Platform Features
        </h2>
        <div className="restaurant-features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="restaurant-feature-card"
            >
              <div className="restaurant-feature-icon">
                {feature.icon}
              </div>
              <h3 className="restaurant-feature-title">
                {feature.title}
              </h3>
              <p className="restaurant-feature-desc">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Safety Section */}
      <div className="restaurant-instructions">
        <div className="restaurant-instructions-grid">
          <h2 className="restaurant-section-heading">
            🛡️ Legal & Safety Guidelines
          </h2>
          <div className="restaurant-guidelines-grid">
            <div className="restaurant-guideline-card">
              <h3 className="restaurant-guideline-title">
                ⚖️ Legal Protection
              </h3>
              <ul className="restaurant-guideline-list">
                <li>Good Samaritan Food Donation Act protects donors</li>
                <li>No liability for good faith donations</li>
                <li>Tax deduction benefits available</li>
                <li>Compliance with local health regulations</li>
              </ul>
            </div>
            <div className="restaurant-guideline-card">
              <h3 className="restaurant-guideline-title">
                🧼 Safety Standards
              </h3>
              <ul className="restaurant-guideline-list">
                <li>Maintain proper food temperatures</li>
                <li>Use clean, food-grade containers</li>
                <li>Label with preparation date and time</li>
                <li>Follow FIFO (First In, First Out) principles</li>
              </ul>
            </div>
          </div>
          <div className="restaurant-dos-donts">
            <h4 className="restaurant-instruction-title">✅ Do's</h4>
            <ul className="restaurant-instruction-list">
              <li>Donate food within 2 hours of preparation</li>
              <li>Keep hot foods hot (above 140°F) and cold foods cold (below 40°F)</li>
              <li>Use proper packaging and labeling</li>
              <li>Maintain donation records for tax purposes</li>
            </ul>
            <h4 className="restaurant-instruction-title">❌ Don'ts</h4>
            <ul className="restaurant-instruction-list">
              <li>Don't donate food past its expiration date</li>
              <li>Don't mix different food types in same container</li>
              <li>Don't donate food that's been sitting at room temperature</li>
              <li>Don't forget to communicate special handling requirements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Food Types Section */}
      <div className="restaurant-guidelines">
        <h2 className="restaurant-section-heading">
          🍽️ Types of Food We Accept
        </h2>
        <div className="restaurant-guidelines-grid">
          <div className="restaurant-guideline-card">
            <h3 className="restaurant-guideline-title">
              🍲 Prepared Meals
            </h3>
            <ul className="restaurant-guideline-list">
              <li>Cooked entrees and side dishes</li>
              <li>Soups and stews</li>
              <li>Sandwiches and wraps</li>
              <li>Salads (within 2 hours of prep)</li>
            </ul>
          </div>
          <div className="restaurant-guideline-card">
            <h3 className="restaurant-guideline-title">
              📦 Packaged Foods
            </h3>
            <ul className="restaurant-guideline-list">
              <li>Unopened canned goods</li>
              <li>Sealed packaged items</li>
              <li>Bread and baked goods</li>
              <li>Dairy products (within date)</li>
            </ul>
          </div>
          <div className="restaurant-guideline-card">
            <h3 className="restaurant-guideline-title">
              🎉 Event Leftovers
            </h3>
            <ul className="restaurant-guideline-list">
              <li>Catered event surplus</li>
              <li>Buffet items (properly maintained)</li>
              <li>Untouched plated meals</li>
              <li>Beverages and desserts</li>
            </ul>
          </div>
        </div>
        <div className="restaurant-not-accepted">
          <h3 className="restaurant-guideline-title">⚠️ Items NOT Accepted</h3>
          <div className="restaurant-guidelines-grid">
            <ul className="restaurant-guideline-list">
              <li>Expired or spoiled food</li>
              <li>Home-cooked meals</li>
              <li>Opened containers from customers</li>
            </ul>
            <ul className="restaurant-guideline-list">
              <li>Alcohol or alcoholic beverages</li>
              <li>Food with unknown ingredients</li>
              <li>Items stored improperly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="restaurant-steps-section">
        <h2 className="restaurant-section-heading">
          📋 How It Works for Restaurants
        </h2>
        <div className="restaurant-steps-grid">
          <div className="restaurant-step-card">
            <div className="restaurant-step-icon">
              1
            </div>
            <div className="restaurant-step-content">
              <h3 className="restaurant-feature-title">
                Sign Up
              </h3>
              <p className="restaurant-feature-desc">
                Create your restaurant profile in minutes. Provide basic information about your establishment.
              </p>
            </div>
          </div>
          <div className="restaurant-step-card">
            <div className="restaurant-step-icon">
              2
            </div>
            <div className="restaurant-step-content">
              <h3 className="restaurant-feature-title">
                List Surplus Food
              </h3>
              <p className="restaurant-feature-desc">
                When you have surplus food, simply list it on our platform with details like type, quantity, and pickup time.
              </p>
            </div>
          </div>
          <div className="restaurant-step-card">
            <div className="restaurant-step-icon">
              3
            </div>
            <div className="restaurant-step-content">
              <h3 className="restaurant-feature-title">
                Coordinate Pickup
              </h3>
              <p className="restaurant-feature-desc">
                NGOs will contact you to arrange pickup. Coordinate the details and hand over the food.
              </p>
            </div>
          </div>
          <div className="restaurant-step-card">
            <div className="restaurant-step-icon">
              4
            </div>
            <div className="restaurant-step-content">
              <h3 className="restaurant-feature-title">
                Track Impact
              </h3>
              <p className="restaurant-feature-desc">
                Monitor your impact through our dashboard. See how many meals you've helped provide to the community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="restaurant-faqs-section">
        <h2 className="restaurant-section-heading">
          Ready to Make a Difference?
        </h2>
        <p className="restaurant-faq-text">
          Join hundreds of restaurants already making an impact in their communities.
        </p>
        <div className="restaurant-steps-grid">
          <Link
            to="/restaurant-submission"
            className="restaurant-cta-primary"
            onMouseOver={(e) => e.target.style.backgroundColor = '#2bc066'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#38e07b'}
          >
            🍽️ Donate Food Now
          </Link>
          <Link
            to="/restaurant-dashboard"
            className="restaurant-cta-secondary"
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#38e07b';
              e.target.style.color = '#0e1a13';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#e8f2ec';
              e.target.style.color = '#0e1a13';
            }}
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
