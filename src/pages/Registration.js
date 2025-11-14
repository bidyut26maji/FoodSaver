import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: ''
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
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Registration submitted successfully! We will contact you soon.');
    }, 2000);
  };

  return (
    <div className="content-wrapper">
      {/* Back to Home Button */}
      <div style={{ padding: '16px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#94e0b2',
            color: '#101914',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'background-color 0.3s',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7bcc9b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#94e0b2'}
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* ✅ ENHANCED Hero Section */}
      <div
        style={{
          display: 'flex',
          height: '400px', // taller for better visual impact
          minHeight: '300px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          marginBottom: '48px',
          borderRadius: '16px', // consistent modern radius
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.6) 0%,
              rgba(0, 0, 0, 0.3) 100%
            ),
            url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '700px', zIndex: 2 }}>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(2rem, 5vw, 3rem)', // responsive font
              fontWeight: '800',
              lineHeight: 1.2,
              margin: '0 0 16px',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            Join FoodSaver Today
          </h1>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
              fontWeight: '400',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '600px',
              padding: '0 12px',
            }}
          >
            Register your organization and help reduce food waste while feeding those in need.
          </p>
        </div>
      </div>

      {/* Registration Form & Rest Unchanged (except minor spacing) */}
      <div style={{ padding: '0 16px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          padding: '36px',
          backgroundColor: '#f8fbfa',
          borderRadius: '16px',
          border: '1px solid #daeded',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          marginBottom: '48px'
        }}>
          <h2
            style={{
              color: '#0e1a13',
              fontSize: '28px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '36px'
            }}
          >
            Organization Registration
          </h2>

          <form onSubmit={handleSubmit}>
            {/* ✅ Keep all form fields the same — they’re clean and functional */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Organization Type *
                </label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <option value="">Select Organization Type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="ngo">NGO / Non-Profit</option>
                  <option value="catering">Catering Service</option>
                  <option value="bakery">Bakery</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter organization name"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter contact person name"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter street address"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #daeded',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>

            <div style={{ marginBottom: '36px' }}>
              <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Organization Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '1px solid #daeded',
                  borderRadius: '10px',
                  fontSize: '16px',
                  resize: 'vertical',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
                placeholder="Tell us about your organization and how you plan to use the platform..."
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '16px 40px',
                  backgroundColor: isSubmitting ? '#cccccc' : '#38e07b',
                  color: '#0e1a13',
                  fontWeight: '700',
                  fontSize: '18px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(56, 224, 123, 0.3)',
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) e.target.style.backgroundColor = '#2bc066';
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) e.target.style.backgroundColor = '#38e07b';
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info Box */}
        <div style={{
          padding: '28px',
          backgroundColor: '#e8f2ec',
          borderRadius: '16px',
          border: '1px solid #daeded',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <h3 style={{ color: '#0e1a13', fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>
            What Happens Next?
          </h3>
          <p style={{ color: '#51946c', fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
            After submitting your registration, our team will review your application and contact you within 2–3 business days to complete onboarding.
          </p>
          <p style={{ color: '#51946c', fontSize: '16px', lineHeight: '1.6' }}>
            Questions? Email us at{' '}
            <a href="mailto:info@foodsaver.com" style={{ color: '#38e07b', textDecoration: 'none', fontWeight: '600' }}>
              info@foodsaver.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;