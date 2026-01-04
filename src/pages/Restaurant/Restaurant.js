import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Utensils,
  ShieldCheck,
  TrendingUp,
  Users,
  Clock,
  Bell,
  ClipboardCheck,
  ChevronRight,
  ArrowLeft,
  Store,
  Leaf,
  Award
} from 'lucide-react';
import './Restaurant.css';

const Restaurant = () => {
  // SEO optimization
  useEffect(() => {
    document.title = 'Restaurant Food Donation Platform | FoodSaver - Reduce Waste, Feed Communities';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join FoodSaver\'s restaurant food donation platform. Reduce food waste, help communities, get tax benefits. Safe food handling guidelines, legal protection, and easy pickup coordination.');
    }
  }, []);

  const benefits = [
    {
      title: 'Reduce Waste',
      description: 'Significantly lower your daily food waste and associated disposal costs.',
      icon: <Utensils className="benefit-icon-svg" />
    },
    {
      title: 'Community Impact',
      description: 'Directly support local hunger relief efforts and strengthen community bonds.',
      icon: <Users className="benefit-icon-svg" />
    },
    {
      title: 'Brand Reputation',
      description: 'Enhance your brand image as a socially responsible and sustainable business.',
      icon: <Award className="benefit-icon-svg" />
    },
    {
      title: 'Easy Platform',
      description: 'Seamlessly list surplus food in minutes through our intuitive interface.',
      icon: <Store className="benefit-icon-svg" />
    },
    {
      title: 'Insights',
      description: 'Track your donations and environmental impact with detailed analytics.',
      icon: <TrendingUp className="benefit-icon-svg" />
    },
    {
      title: 'Sustainability',
      description: 'Become a leader in sustainable practices within the food service industry.',
      icon: <Leaf className="benefit-icon-svg" />
    }
  ];

  const features = [
    {
      title: 'Real-time Listing',
      description: 'List surplus food items instantly. Specify type, quantity, and pickup windows.',
      icon: <ClipboardCheck />
    },
    {
      title: 'Instant Notifications',
      description: 'Get alerted as soon as an NGO is interested in your donation.',
      icon: <Bell />
    },
    {
      title: 'Smart Scheduling',
      description: 'Coordinate pickups that align perfectly with your kitchen\'s workflow.',
      icon: <Clock />
    }
  ];

  const steps = [
    {
      title: 'Join the Network',
      description: 'Create your professional restaurant profile and set your donation preferences.',
      icon: '🏪'
    },
    {
      title: 'List Surplus Food',
      description: 'Whenever surplus is identified, list it on our platform with ease.',
      icon: '📝'
    },
    {
      title: 'Coordinate Pickup',
      description: 'Match with a local NGO and arrange a convenient pickup time.',
      icon: '🚚'
    },
    {
      title: 'See the Change',
      description: 'Monitor your dashboard to see total meals provided and waste diverted.',
      icon: '📊'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="restaurant-page-new">
      {/* Animated Background Orbs */}
      <div className="res-orbs-container">
        <div className="res-orb or-1" />
        <div className="res-orb or-2" />
        <div className="res-orb or-3" />
      </div>

      <div className="res-content-wrapper">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="res-back-btn-wrapper"
        >
          <Link to="/" className="res-back-btn">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="res-hero">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="res-hero-badge"
          >
            <Store size={20} className="res-badge-icon" />
            <span>Sustainable Kitchen Partners</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="res-hero-title"
          >
            Empower Your Kitchen <br />
            <span className="gradient-text">Serve Your Community</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="res-hero-subtitle"
          >
            Transform surplus food into social impact. Join a network of forward-thinking
            restaurants dedicated to reducing waste and feeding those in need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="res-hero-actions"
          >
            <Link to="/registration" className="res-btn-primary">
              Get Started Now <ChevronRight size={20} />
            </Link>
            <Link to="/contact" className="res-btn-secondary">
              Talk to Our Team
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="res-hero-visual"
          >
            <div className="res-visual-overlay" />
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
              alt="Professional Restaurant Kitchen"
              className="res-hero-img"
            />
          </motion.div>
        </section>

        {/* Benefits Grid */}
        <section className="res-benefits-section">
          <div className="res-section-header">
            <h2 className="res-section-title">Why Partner With Us?</h2>
            <p className="res-section-subtitle">A sustainable partnership designed for operational efficiency and social contribution.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="res-benefits-grid"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants} className="res-benefit-card">
                <div className="res-benefit-icon-wrapper">
                  {benefit.icon}
                </div>
                <h3 className="res-benefit-item-title">{benefit.title}</h3>
                <p className="res-benefit-item-desc">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How It Works - Timeline */}
        <section className="res-steps-section">
          <div className="res-section-header">
            <h2 className="res-section-title">The Onboarding Process</h2>
            <p className="res-section-subtitle">Getting your kitchen started on FoodSaver is simple and streamlined.</p>
          </div>

          <div className="res-timeline">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="res-timeline-item"
              >
                <div className="res-timeline-icon">{step.icon}</div>
                <div className="res-timeline-content">
                  <div className="res-step-num">Step {index + 1}</div>
                  <h3 className="res-step-title">{step.title}</h3>
                  <p className="res-step-desc">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features & Stats Section */}
        <section className="res-features-highlight">
          <div className="res-features-inner">
            <div className="res-features-content">
              <h2 className="res-highlight-title">Built for Modern Hospitality</h2>
              <div className="res-features-list">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="res-highlight-item"
                  >
                    <div className="res-highlight-icon">{feature.icon}</div>
                    <div>
                      <h4 className="res-highlight-item-title">{feature.title}</h4>
                      <p className="res-highlight-item-desc">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="res-stats-visual">
              <div className="res-stat-pill">
                <span className="res-stat-num">500+</span>
                <span className="res-stat-label">Active Restaurants</span>
              </div>
              <div className="res-stat-pill secondary">
                <span className="res-stat-num">1M+</span>
                <span className="res-stat-label">Meals Provided</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Safety Section */}
        <section className="res-trust-section">
          <div className="res-trust-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="res-trust-card legal"
            >
              <ShieldCheck size={40} className="res-trust-icon" />
              <h3 className="res-trust-title">Legal Protection</h3>
              <p className="res-trust-desc">
                Protected by the <strong>Good Samaritan Food Donation Act</strong>, which shields donors
                from liability when donating in good faith to non-profit organizations.
              </p>
              <ul className="res-trust-list">
                <li>Federal liability protection</li>
                <li>Tax incentive eligibility</li>
                <li>Compliance support</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="res-trust-card safety"
            >
              <div className="res-trust-header">
                <h3 className="res-trust-title">Safety Commitment</h3>
                <span className="res-safety-badge">Certified Standards</span>
              </div>
              <p className="res-trust-desc">
                We maintain rigorous food safety protocols to ensure that quality is never compromised
                during the transition from your kitchen to the table.
              </p>
              <div className="res-dos-donts-preview">
                <div className="res-do-item">✓ Temperature Control</div>
                <div className="res-do-item">✓ Proper Labeling</div>
                <div className="res-do-item">✓ Sealed Containers</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="res-final-cta">
          <div className="res-cta-card">
            <div className="res-cta-glow" />
            <h2 className="res-cta-title">Ready to Lead the Change?</h2>
            <p className="res-cta-desc">
              Join hundreds of restaurants already making a tangible difference in their local communities.
            </p>
            <div className="res-cta-buttons">
              <Link to="/registration" className="res-btn-primary">
                Join FoodSaver
              </Link>
              <Link to="/restaurant-dashboard" className="res-btn-secondary-glass">
                Partner Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Restaurant;
