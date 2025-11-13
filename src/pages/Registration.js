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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Registration submitted successfully! We will contact you soon.');
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
      <div className="registration-hero">
        <div className="hero-content">
          <h1>
            Join FoodSaver
          </h1>
          <h2>
            Register your organization and start making a difference in your community.
          </h2>
        </div>
      </div>

      {/* Registration Form */}
      <div style={{ padding: '0 16px', maxWidth: '800px', margin: '40px auto' }}>
        <div style={{
          padding: '32px',
          backgroundColor: '#f8fbfa',
          borderRadius: '12px',
          border: '1px solid #daeded',
          marginBottom: '40px'
        }}>
          <h2
            style={{
              color: '#0e1a13',
              fontSize: '24px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            Organization Registration
          </h2>

          <form onSubmit={handleSubmit}>
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
                    padding: '12px',
                    border: '1px solid #daeded',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white'
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
                    padding: '12px',
                    border: '1px solid #daeded',
                    borderRadius: '8px',
                    fontSize: '16px'
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
                    padding: '12px',
                    border: '1px solid #daeded',
                    borderRadius: '8px',
                    fontSize: '16px'
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
                    padding: '12px',
                    border: '1px solid #daeded',
                    borderRadius: '8px',
                    fontSize: '16px'
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
                    padding: '12px',
                    border: '1px solid #daeded',
                    borderRadius: '8px',
                    fontSize: '16px'
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
                    padding: '12px',
                    border: '1px solid #daeded',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  placeholder="Enter street address"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="Enter city" style={{ width: '100%', padding: '12px', border: '1px solid #daeded', borderRadius: '8px', fontSize: '16px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>State *</label>
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} required placeholder="Enter state" style={{ width: '100%', padding: '12px', border: '1px solid #daeded', borderRadius: '8px', fontSize: '16px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Zip Code *</label>
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required placeholder="Enter zip code" style={{ width: '100%', padding: '12px', border: '1px solid #daeded', borderRadius: '8px', fontSize: '16px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', color: '#0e1a13', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Brief Description of Organization</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Tell us about your organization's mission..." style={{ width: '100%', padding: '12px', border: '1px solid #daeded', borderRadius: '8px', fontSize: '16px', resize: 'vertical' }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" disabled={isSubmitting} style={{ padding: '12px 32px', backgroundColor: isSubmitting ? '#a0a0a0' : '#2a8a5f', color: 'white', fontWeight: 'bold', fontSize: '16px', borderRadius: '12px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s' }}>
                {isSubmitting ? 'Submitting...' : 'Register Organization'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;