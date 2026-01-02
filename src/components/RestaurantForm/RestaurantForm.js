import React, { useState, useEffect } from 'react';

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    foodType: '',
    quantity: '',
    quantityUnit: 'kg',
    pickupTime: '',
    address: '',
    contactNumber: '',
    additionalNotes: '',
    foodImage: null,
    freshnessDuration: '',
    isVegetarian: false,
    cutleryRequired: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem('foodSaver_draft');
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      setFormData(parsedDraft);
    }
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'restaurantName':
        return value.trim() ? '' : 'Restaurant name is required';
      case 'foodType':
        return value ? '' : 'Food type is required';
      case 'quantity':
        return value && value > 0 ? '' : 'Valid quantity is required';
      case 'pickupTime':
        return value ? '' : 'Pickup time is required';
      case 'address':
        return value.trim() ? '' : 'Address is required';
      case 'contactNumber':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/\s/g, '')) ? '' : 'Valid phone number is required';
      case 'freshnessDuration':
        return value ? '' : 'Freshness duration is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, foodImage: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['restaurantName', 'foodType', 'quantity', 'pickupTime', 'address', 'contactNumber', 'freshnessDuration'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (data) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        resolve({ success: true });
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await submitForm(formData);
      setShowSuccess(true);
      localStorage.removeItem('foodSaver_draft');
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      restaurantName: '',
      foodType: '',
      quantity: '',
      quantityUnit: 'kg',
      pickupTime: '',
      address: '',
      contactNumber: '',
      additionalNotes: '',
      foodImage: null,
      freshnessDuration: '',
      isVegetarian: false,
      cutleryRequired: false
    });
    setErrors({});
    setImagePreview(null);
    localStorage.removeItem('foodSaver_draft');
  };

  const handleSampleData = () => {
    setFormData({
      restaurantName: 'Green Garden Restaurant',
      foodType: 'Cooked',
      quantity: '15',
      quantityUnit: 'plates',
      pickupTime: '18:30',
      address: '123 Main Street, Downtown, City 12345',
      contactNumber: '+1234567890',
      additionalNotes: 'Fresh vegetable curry and rice. Please bring containers.',
      foodImage: null,
      freshnessDuration: '2-6 hrs',
      isVegetarian: true,
      cutleryRequired: false
    });
  };

  const handleSaveDraft = () => {
    localStorage.setItem('foodSaver_draft', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  const handleNewSubmission = () => {
    setShowSuccess(false);
    handleClear();
  };

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Submission Successful!</h2>
          <p>Thank you for contributing to reducing food waste. An NGO will contact you soon for pickup.</p>
          <div className="success-actions">
            <button onClick={handleNewSubmission} className="btn-primary">
              Submit Another Entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Restaurant Food Donation Form</h1>
        <p>Help reduce food waste by donating your surplus food to those in need</p>
      </div>

      <form onSubmit={handleSubmit} className="restaurant-form">
        <div className="form-grid">
          {/* Restaurant Name */}
          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name *</label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleInputChange}
              className={errors.restaurantName ? 'error' : ''}
              aria-describedby={errors.restaurantName ? 'restaurantName-error' : undefined}
            />
            {errors.restaurantName && (
              <span id="restaurantName-error" className="error-message" role="alert">
                {errors.restaurantName}
              </span>
            )}
          </div>

          {/* Food Type */}
          <div className="form-group">
            <label htmlFor="foodType">Food Type *</label>
            <select
              id="foodType"
              name="foodType"
              value={formData.foodType}
              onChange={handleInputChange}
              className={errors.foodType ? 'error' : ''}
            >
              <option value="">Select food type</option>
              <option value="Cooked">Cooked</option>
              <option value="Raw">Raw</option>
              <option value="Bakery">Bakery</option>
              <option value="Packaged">Packaged</option>
            </select>
            {errors.foodType && (
              <span className="error-message" role="alert">{errors.foodType}</span>
            )}
          </div>

          {/* Quantity */}
          <div className="form-group quantity-group">
            <label htmlFor="quantity">Quantity *</label>
            <div className="quantity-input">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                className={errors.quantity ? 'error' : ''}
              />
              <select
                name="quantityUnit"
                value={formData.quantityUnit}
                onChange={handleInputChange}
                className="unit-select"
              >
                <option value="kg">kg</option>
                <option value="plates">plates</option>
                <option value="boxes">boxes</option>
                <option value="portions">portions</option>
              </select>
            </div>
            {errors.quantity && (
              <span className="error-message" role="alert">{errors.quantity}</span>
            )}
          </div>

          {/* Pickup Time */}
          <div className="form-group">
            <label htmlFor="pickupTime">Pickup Time *</label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
              className={errors.pickupTime ? 'error' : ''}
            />
            {errors.pickupTime && (
              <span className="error-message" role="alert">{errors.pickupTime}</span>
            )}
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number *</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="+1234567890"
              className={errors.contactNumber ? 'error' : ''}
            />
            {errors.contactNumber && (
              <span className="error-message" role="alert">{errors.contactNumber}</span>
            )}
          </div>

          {/* Freshness Duration */}
          <div className="form-group">
            <label htmlFor="freshnessDuration">Food Freshness Duration *</label>
            <select
              id="freshnessDuration"
              name="freshnessDuration"
              value={formData.freshnessDuration}
              onChange={handleInputChange}
              className={errors.freshnessDuration ? 'error' : ''}
            >
              <option value="">Select duration</option>
              <option value="<2 hrs">&lt;2 hrs</option>
              <option value="2-6 hrs">2–6 hrs</option>
              <option value="6-12 hrs">6–12 hrs</option>
            </select>
            {errors.freshnessDuration && (
              <span className="error-message" role="alert">{errors.freshnessDuration}</span>
            )}
          </div>
        </div>

        {/* Address - Full Width */}
        <div className="form-group full-width">
          <label htmlFor="address">Pickup Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            placeholder="Enter complete pickup address"
            className={errors.address ? 'error' : ''}
          />
          {errors.address && (
            <span className="error-message" role="alert">{errors.address}</span>
          )}
        </div>

        {/* Additional Notes */}
        <div className="form-group full-width">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            rows="3"
            placeholder="Any special instructions or details about the food"
          />
        </div>

        {/* Image Upload */}
        <div className="form-group full-width">
          <label htmlFor="foodImage">Food Image</label>
          <div className="image-upload">
            <input
              type="file"
              id="foodImage"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="foodImage" className="file-label">
              📷 Choose Image
            </label>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Food preview" />
              </div>
            )}
          </div>
        </div>

        {/* Toggles */}
        <div className="form-toggles">
          <div className="toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                name="isVegetarian"
                checked={formData.isVegetarian}
                onChange={handleInputChange}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              Is This Food Vegetarian?
            </label>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="cutleryRequired"
                checked={formData.cutleryRequired}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Cutlery Required During Pickup
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <div className="action-buttons">
            <button type="button" onClick={handleClear} className="btn-secondary">
              Clear Form
            </button>
            <button type="button" onClick={handleSampleData} className="btn-secondary">
              Sample Data
            </button>
            <button type="button" onClick={handleSaveDraft} className="btn-secondary">
              Save Draft
            </button>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary submit-btn"
          >
            {isSubmitting ? (
              <span className="loading">
                <span className="spinner"></span>
                Submitting...
              </span>
            ) : (
              'Submit Donation'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;