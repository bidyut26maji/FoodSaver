import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Faq from '../components/Faq';

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
          minHeight: '300px',
          flexDirection: 'column',
          gap: '24px',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
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
            Contact Us
          </h1>
          <h2 style={{ color: 'white', fontSize: '1rem', fontWeight: '400', lineHeight: '1.5' }}>
            Get in touch with us. We'd love to hear from you and answer any questions you may have.
          </h2>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div style={{ padding: '0 16px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Contact Information */}
          <div>
            <h2
              style={{
                color: '#0e1a13',
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '24px'
              }}
            >
              Get in Touch
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#38e07b',
                    borderRadius: '50%',
                    fontSize: '20px'
                  }}
                >
                  📧
                </div>
                <div>
                  <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    Email
                  </h3>
                  <p style={{ color: '#51946c', fontSize: '16px', margin: 0 }}>
                    <a href="mailto:info@foodsaver.com" style={{ color: '#38e07b', textDecoration: 'none' }}>
                      info@foodsaver.com
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#38e07b',
                    borderRadius: '50%',
                    fontSize: '20px'
                  }}
                >
                  📞
                </div>
                <div>
                  <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    Phone
                  </h3>
                  <p style={{ color: '#51946c', fontSize: '16px', margin: 0 }}>
                    <a href="tel:+1234567890" style={{ color: '#38e07b', textDecoration: 'none' }}>
                      +1 (234) 567-8900
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#38e07b',
                    borderRadius: '50%',
                    fontSize: '20px'
                  }}
                >
                  📍
                </div>
                <div>
                  <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    Address
                  </h3>
                  <p style={{ color: '#51946c', fontSize: '16px', margin: 0 }}>
                    Haldia Institute of Technology<br />
                    Haldia, West Bengal, India<br />
                    721657
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#38e07b',
                    borderRadius: '50%',
                    fontSize: '20px'
                  }}
                >
                  ⏰
                </div>
                <div>
                  <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    Business Hours
                  </h3>
                  <p style={{ color: '#51946c', fontSize: '16px', margin: 0 }}>
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ color: '#0e1a13', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Follow Us
              </h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#" style={{ color: '#38e07b', fontSize: '24px', textDecoration: 'none' }}>📘</a>
                <a href="#" style={{ color: '#38e07b', fontSize: '24px', textDecoration: 'none' }}>🐦</a>
                <a href="#" style={{ color: '#38e07b', fontSize: '24px', textDecoration: 'none' }}>📷</a>
                <a href="#" style={{ color: '#38e07b', fontSize: '24px', textDecoration: 'none' }}>💼</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              style={{
                color: '#0e1a13',
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '24px'
              }}
            >
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #daeded',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #daeded',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #daeded',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #daeded',
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                    placeholder="Enter your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: isSubmitting ? '#cccccc' : '#38e07b',
                    color: '#0e1a13',
                    fontWeight: '700',
                    fontSize: '18px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => {
                    if (!isSubmitting) e.target.style.backgroundColor = '#2bc066';
                  }}
                  onMouseOut={(e) => {
                    if (!isSubmitting) e.target.style.backgroundColor = '#38e07b';
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <Faq/>
        
        
      </div>
    </div>
  );
};

export default Contact;
