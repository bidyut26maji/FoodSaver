import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

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
      <div className="registration-back-button-container">
        <Link
          to="/"
          className="registration-back-button"
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* ✅ ENHANCED Hero Section */}
      <div
        className="registration-hero"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")`
        }}
      >
        <div className="registration-hero-content">
          <h1 className="registration-hero-title">
            Join FoodSaver Today
          </h1>
          <p className="registration-hero-subtitle">
            Register your organization and help reduce food waste while feeding those in need.
          </p>
        </div>
      </div>

      {/* Registration Form & Rest Unchanged (except minor spacing) */}
      <div className="registration-container">
        <div className="registration-form-wrapper">
          <h2 className="registration-form-title">
            Organization Registration
          </h2>

          <form onSubmit={handleSubmit}>
            {/* ✅ Keep all form fields the same — they’re clean and functional */}
            <div className="registration-form-row">
              <div>
                <label className="registration-label">
                  Organization Type *
                </label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  required
                  className="registration-select"
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
                <label className="registration-label">
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter organization name"
                />
              </div>
            </div>

            <div className="registration-form-row">
              <div>
                <label className="registration-label">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter contact person name"
                />
              </div>

              <div>
                <label className="registration-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="registration-form-row">
              <div>
                <label className="registration-label">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="registration-label">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter street address"
                />
              </div>
            </div>

            <div className="registration-form-row-small">
              <div>
                <label className="registration-label">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="registration-label">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="registration-label">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="registration-input"
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>

            <div className="registration-form-field">
              <label className="registration-label">
                Organization Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="registration-textarea"
                placeholder="Tell us about your organization and how you plan to use the platform..."
              />
            </div>

            <div className="registration-submit-container">
              <button
                type="submit"
                disabled={isSubmitting}
                className="registration-submit-button"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info Box */}
        <div className="registration-info-box">
          <h3 className="registration-info-title">
            What Happens Next?
          </h3>
          <p className="registration-info-text">
            After submitting your registration, our team will review your application and contact you within 2–3 business days to complete onboarding.
          </p>
          <p className="registration-info-text">
            Questions? Email us at{' '}
            <a href="mailto:info@foodsaver.com" className="registration-info-link">
              info@foodsaver.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;