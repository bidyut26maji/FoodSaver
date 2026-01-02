import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NGO.css';

const NGO = () => {
  // SEO optimization
  useEffect(() => {
    document.title = 'NGO Food Collection Platform | FoodSaver - Access Quality Food Donations';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join FoodSaver\'s NGO platform for food collection. Learn pickup processes, food storage safety, volunteer management. Access quality restaurant donations for community distribution.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Join FoodSaver\'s NGO platform for food collection. Learn pickup processes, food storage safety, volunteer management. Access quality restaurant donations for community distribution.';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    
    // Add keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'NGO food pickup, food storage safety, volunteer management, food distribution, community feeding, food collection process, food safety training');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'NGO food pickup, food storage safety, volunteer management, food distribution, community feeding, food collection process, food safety training';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, []);
  const benefits = [
    'Access to quality food donations from local restaurants',
    'Efficient coordination system for food pickups',
    'Expand your community reach and impact',
    'Track donations and impact with detailed analytics',
    'Connect with multiple restaurants in your area',
    'Reduce operational costs for food procurement'
  ];

  const features = [
    {
      title: 'Browse Donations',
      description: 'View available food donations from restaurants in your area',
      icon: '🔍'
    },
    {
      title: 'Easy Coordination',
      description: 'Coordinate pickups directly through our platform',
      icon: '📞'
    },
    {
      title: 'Impact Tracking',
      description: 'Track your organization\'s impact and food distribution',
      icon: '📊'
    },
    {
      title: 'Community Network',
      description: 'Connect with other NGOs and build community partnerships',
      icon: '🤝'
    }
  ];

  return (
    <div className="content-wrapper">
      {/* Back to Home Button */}
      <div className="ngo-back-button-container">
        <Link to="/" className="ngo-back-button">
          ⬅ Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="ngo-hero">
        <div className="ngo-hero-content">
          <h1 className="ngo-hero-title">
            For NGOs
          </h1>
          <h2 className="ngo-hero-subtitle">
            Access quality food donations and expand your community impact. Join NGOs making a difference.
          </h2>
        </div>
        <Link to="/registration" className="ngo-hero-cta">
          <span>Get Started</span>
        </Link>
      </div>

      {/* Benefits Section */}
      <div className="ngo-section">
        <h2 className="ngo-section-title">
          Why Join FoodSaver?
        </h2>
        <div className="ngo-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="ngo-benefit-card">
              <p className="ngo-benefit-text">
                ✓ {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="ngo-section">
        <h2 className="ngo-section-title">
          Platform Features
        </h2>
        <div className="ngo-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="ngo-feature-card">
              <div className="ngo-feature-icon">
                {feature.icon}
              </div>
              <h3 className="ngo-feature-title">
                {feature.title}
              </h3>
              <p className="ngo-feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pickup Process Section */}
      <div className="ngo-section-bg">
        <div className="ngo-section-inner">
          <h2 className="ngo-section-title">
            🚚 Food Pickup Process
          </h2>
          <div className="ngo-process-grid">
            <div className="ngo-process-card">
              <h3 className="ngo-process-title">🔄 Step-by-Step Flow</h3>
              <ol className="ngo-process-list">
                <li><strong>Browse:</strong> View available donations on dashboard</li>
                <li><strong>Request:</strong> Submit pickup request with details</li>
                <li><strong>Confirm:</strong> Restaurant confirms availability</li>
                <li><strong>Coordinate:</strong> Arrange pickup time and location</li>
                <li><strong>Collect:</strong> Pick up food with proper equipment</li>
                <li><strong>Distribute:</strong> Deliver to community within 2 hours</li>
              </ol>
            </div>
            <div className="ngo-process-card">
              <h3 className="ngo-process-title">⏰ Realistic Timelines</h3>
              <ul className="ngo-process-list">
                <li><strong>Request Response:</strong> Within 30 minutes</li>
                <li><strong>Pickup Window:</strong> 1-4 hours from confirmation</li>
                <li><strong>Distribution:</strong> Within 2 hours of pickup</li>
                <li><strong>Peak Hours:</strong> Lunch (11am-2pm), Dinner (5pm-8pm)</li>
              </ul>
            </div>
          </div>
          <div className="ngo-responsibilities-card">
            <h4 className="ngo-responsibilities-title">📝 Roles & Responsibilities</h4>
            <div className="ngo-responsibilities-grid">
              <div className="ngo-responsibility-section">
                <strong>NGOs:</strong>
                <ul className="ngo-responsibility-list">
                  <li>Timely pickup coordination</li>
                  <li>Proper transportation equipment</li>
                  <li>Food safety compliance</li>
                </ul>
              </div>
              <div className="ngo-responsibility-section">
                <strong>Volunteers:</strong>
                <ul className="ngo-responsibility-list">
                  <li>Safe food handling</li>
                  <li>Professional communication</li>
                  <li>Timely arrival</li>
                </ul>
              </div>
              <div className="ngo-responsibility-section">
                <strong>Restaurants:</strong>
                <ul className="ngo-responsibility-list">
                  <li>Food preparation standards</li>
                  <li>Proper packaging</li>
                  <li>Clear communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Recommendations Section */}
      <div className="ngo-section">
        <h2 className="ngo-section-title">
          🌡️ Food Storage & Safety Guidelines
        </h2>
        <div className="ngo-storage-grid">
          <div className="ngo-storage-card">
            <h3 className="ngo-storage-title">
              ❄️ Perishable Foods
            </h3>
            <ul className="ngo-storage-list">
              <li><strong>Cold foods:</strong> Keep below 40°F (4°C)</li>
              <li><strong>Hot foods:</strong> Keep above 140°F (60°C)</li>
              <li><strong>Transport:</strong> Use insulated containers</li>
              <li><strong>Time limit:</strong> Distribute within 2 hours</li>
            </ul>
          </div>
          <div className="ngo-storage-card">
            <h3 className="ngo-storage-title">
              📦 Non-Perishable Foods
            </h3>
            <ul className="ngo-storage-list">
              <li><strong>Storage:</strong> Cool, dry place</li>
              <li><strong>Containers:</strong> Sealed, pest-proof</li>
              <li><strong>Rotation:</strong> First in, first out (FIFO)</li>
              <li><strong>Inspection:</strong> Check for damage/expiration</li>
            </ul>
          </div>
        </div>
        <div className="ngo-warning-card">
          <h3 className="ngo-warning-title">⚠️ When to Reject Food</h3>
          <div className="ngo-warning-grid">
            <ul className="ngo-warning-list">
              <li>Temperature abuse (danger zone 40-140°F)</li>
              <li>Visible spoilage or contamination</li>
              <li>Expired or unlabeled items</li>
            </ul>
            <ul className="ngo-warning-list">
              <li>Improper packaging or storage</li>
              <li>Strong odors or unusual appearance</li>
              <li>Cross-contamination risks</li>
            </ul>
          </div>
        </div>
        <div className="ngo-info-card">
          <h4 className="ngo-info-title">🧼 Hygiene & Sanitization</h4>
          <ul className="ngo-info-list">
            <li>Wash hands before and after handling food</li>
            <li>Use clean, sanitized containers and utensils</li>
            <li>Maintain clean transportation vehicles</li>
            <li>Follow local health department guidelines</li>
          </ul>
        </div>
      </div>

      {/* Volunteer Involvement Section */}
      <div className="ngo-section-bg">
        <div className="ngo-section-inner">
          <h2 className="ngo-section-title">
            🤝 Volunteer Management
          </h2>
          <div className="ngo-volunteer-grid">
            <div className="ngo-volunteer-card">
              <h3 className="ngo-volunteer-title">📝 Volunteer Tasks</h3>
              <ul className="ngo-volunteer-list">
                <li>Food pickup coordination</li>
                <li>Transportation and delivery</li>
                <li>Food sorting and packaging</li>
                <li>Distribution to beneficiaries</li>
                <li>Record keeping and reporting</li>
                <li>Community outreach</li>
              </ul>
            </div>
            <div className="ngo-volunteer-card">
              <h3 className="ngo-volunteer-title">🎓 Training Requirements</h3>
              <ul className="ngo-volunteer-list">
                <li>Food safety and handling basics</li>
                <li>Platform usage and communication</li>
                <li>Emergency procedures</li>
                <li>Customer service skills</li>
                <li>Documentation and reporting</li>
                <li>Cultural sensitivity training</li>
              </ul>
            </div>
          </div>
          <div className="ngo-safety-card">
            <h4 className="ngo-safety-title">🛡️ Safety Rules for Volunteers</h4>
            <div className="ngo-safety-grid">
              <ul className="ngo-safety-list">
                <li>Always work in pairs for pickups</li>
                <li>Wear appropriate protective equipment</li>
                <li>Follow proper lifting techniques</li>
              </ul>
              <ul className="ngo-safety-list">
                <li>Report any safety concerns immediately</li>
                <li>Maintain professional communication</li>
                <li>Follow organization protocols</li>
              </ul>
            </div>
          </div>
          <div className="ngo-info-card">
            <h4 className="ngo-info-title">⏰ Time Commitment & Coordination</h4>
            <ul className="ngo-info-list">
              <li><strong>Typical pickup:</strong> 1-2 hours including travel</li>
              <li><strong>Distribution events:</strong> 2-4 hours</li>
              <li><strong>Training sessions:</strong> 2-3 hours initially</li>
              <li><strong>Coordination:</strong> Use platform messaging and mobile apps</li>
              <li><strong>Scheduling:</strong> Flexible shifts based on availability</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="ngo-section">
        <h2 className="ngo-section-title">
          📋 How It Works for NGOs
        </h2>
        <div className="ngo-steps-container">
          <div className="ngo-step">
            <div className="ngo-step-number">
              1
            </div>
            <div>
              <h3 className="ngo-step-title">
                Register Your NGO
              </h3>
              <p className="ngo-step-description">
                Create your NGO profile and provide information about your organization and service areas.
              </p>
            </div>
          </div>
          <div className="ngo-step">
            <div className="ngo-step-number">
              2
            </div>
            <div>
              <h3 className="ngo-step-title">
                Browse Available Donations
              </h3>
              <p className="ngo-step-description">
                View food donations from restaurants in your area. Filter by food type, quantity, and pickup time.
              </p>
            </div>
          </div>
          <div className="ngo-step">
            <div className="ngo-step-number">
              3
            </div>
            <div>
              <h3 className="ngo-step-title">
                Coordinate Pickup
              </h3>
              <p className="ngo-step-description">
                Contact restaurants to arrange pickup times and locations that work for both parties.
              </p>
            </div>
          </div>
          <div className="ngo-step">
            <div className="ngo-step-number">
              4
            </div>
            <div>
              <h3 className="ngo-step-title">
                Distribute to Community
              </h3>
              <p className="ngo-step-description">
                Distribute the collected food to those in need in your community efficiently and safely.
              </p>
            </div>
          </div>
          <div className="ngo-step">
            <div className="ngo-step-number">
              5
            </div>
            <div>
              <h3 className="ngo-step-title">
                Track Your Impact
              </h3>
              <p className="ngo-step-description">
                Monitor your organization's impact through our dashboard and share success stories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="ngo-cta-section">
        <h2 className="ngo-cta-title">
          Ready to Expand Your Impact?
        </h2>
        <p className="ngo-cta-description">
          Join NGOs already making a difference in their communities through food donations.
        </p>
        <Link to="/ngo-dashboard" className="ngo-cta-button">
          Start Collecting Donations
        </Link>
      </div>
    </div>
  );
};

export default NGO;
