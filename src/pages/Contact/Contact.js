import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Faq from '../../components/Faq/Faq';
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

      {/* Contact Form Section */}
      <div className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-header">
            <h2 className="contact-form-title">Send us a Message</h2>
            <p className="contact-form-subtitle">Have a specific inquiry or just want to say hello? Fill out the form below.</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can we help?"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message here..."
                required
                rows="5"
                className="form-input form-textarea"
              ></textarea>
            </div>

            <button
              type="submit"
              className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
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
