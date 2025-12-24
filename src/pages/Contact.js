import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Faq from '../components/Faq';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="content-wrapper">
      {/* Hero Section */}
      <div className="contact-hero">
        <Link to="/" className="contact-back-btn">
          ⬅ Back to Home
        </Link>
        <div>
          <h1 className="contact-hero-title">Contact Us</h1>
          <h2 className="contact-hero-subtitle">
            Get in touch with us. We'd love to hear from you and answer any questions you may have.
          </h2>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="contact-info-section">
        <h2 className="contact-info-title">Get in Touch</h2>
        
        <div className="contact-cards-container">
          {/* Email Card */}
          <div className="contact-card">
            <div className="contact-icon-wrapper">📧</div>
            <h3 className="contact-card-title">Email</h3>
            <p className="contact-card-text">
              <a href="mailto:info@foodsaver.com" className="contact-link">
                info@foodsaver.com
              </a>
            </p>
          </div>

          {/* Phone Card */}
          <div className="contact-card">
            <div className="contact-icon-wrapper">📞</div>
            <h3 className="contact-card-title">Phone</h3>
            <p className="contact-card-text">
              <a href="tel:+1234567890" className="contact-link">
                +1 (234) 567-8900
              </a>
            </p>
          </div>

          {/* Address Card */}
          <div className="contact-card">
            <div className="contact-icon-wrapper">📍</div>
            <h3 className="contact-card-title">Address</h3>
            <p className="contact-card-text">
              Haldia Institute of Technology<br />
              Haldia, West Bengal, India<br />
              721657
            </p>
          </div>

          {/* Business Hours Card */}
          <div className="contact-card">
            <div className="contact-icon-wrapper">⏰</div>
            <h3 className="contact-card-title">Business Hours</h3>
            <p className="contact-card-text">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ padding: '20px', background: 'var(--bg-primary)' }}>
        <Faq />
      </div>
    </div>
  );
};

export default Contact;
