/**
 * Request Validation Middleware
 * Provides comprehensive input validation and sanitization
 */

const validator = require('validator');

/**
 * Validation error class
 */
class ValidationError extends Error {
    constructor(errors) {
        super('Validation failed');
        this.name = 'ValidationError';
        this.errors = errors;
        this.statusCode = 400;
    }
}

/**
 * Sanitize string input
 */
const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return validator.escape(validator.trim(str));
};

/**
 * Validate email
 */
const validateEmail = (email) => {
    if (!email) return { valid: false, message: 'Email is required' };
    if (!validator.isEmail(email)) {
        return { valid: false, message: 'Invalid email format' };
    }
    return { valid: true };
};

/**
 * Validate phone number
 */
const validatePhone = (phone) => {
    if (!phone) return { valid: false, message: 'Phone number is required' };
    
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid length (10 digits for most countries)
    if (cleaned.length < 10 || cleaned.length > 15) {
        return { valid: false, message: 'Phone number must be 10-15 digits' };
    }
    
    return { valid: true, sanitized: cleaned };
};

/**
 * Validate password strength
 */
const validatePassword = (password) => {
    if (!password) return { valid: false, message: 'Password is required' };
    
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    if (errors.length > 0) {
        return { valid: false, message: errors.join('. ') };
    }
    
    return { valid: true };
};

/**
 * Validate MongoDB ObjectId
 */
const validateObjectId = (id) => {
    if (!id) return { valid: false, message: 'ID is required' };
    if (!validator.isMongoId(id)) {
        return { valid: false, message: 'Invalid ID format' };
    }
    return { valid: true };
};

/**
 * Validate URL
 */
const validateURL = (url) => {
    if (!url) return { valid: false, message: 'URL is required' };
    if (!validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
        return { valid: false, message: 'Invalid URL format' };
    }
    return { valid: true };
};

/**
 * Validate date
 */
const validateDate = (date) => {
    if (!date) return { valid: false, message: 'Date is required' };
    
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return { valid: false, message: 'Invalid date format' };
    }
    
    return { valid: true, sanitized: parsedDate };
};

/**
 * Validate number range
 */
const validateNumberRange = (value, min, max) => {
    const num = Number(value);
    
    if (isNaN(num)) {
        return { valid: false, message: 'Value must be a number' };
    }
    
    if (min !== undefined && num < min) {
        return { valid: false, message: `Value must be at least ${min}` };
    }
    
    if (max !== undefined && num > max) {
        return { valid: false, message: `Value must be at most ${max}` };
    }
    
    return { valid: true, sanitized: num };
};

/**
 * Validate enum value
 */
const validateEnum = (value, allowedValues, fieldName = 'Value') => {
    if (!value) return { valid: false, message: `${fieldName} is required` };
    
    if (!allowedValues.includes(value)) {
        return { 
            valid: false, 
            message: `${fieldName} must be one of: ${allowedValues.join(', ')}` 
        };
    }
    
    return { valid: true };
};

/**
 * Validate required fields
 */
const validateRequired = (fields, data) => {
    const errors = {};
    
    fields.forEach(field => {
        if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
            errors[field] = `${field} is required`;
        }
    });
    
    return Object.keys(errors).length > 0 ? { valid: false, errors } : { valid: true };
};

/**
 * Sanitize object recursively
 */
const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    const sanitized = Array.isArray(obj) ? [] : {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'string') {
                sanitized[key] = sanitizeString(obj[key]);
            } else if (typeof obj[key] === 'object') {
                sanitized[key] = sanitizeObject(obj[key]);
            } else {
                sanitized[key] = obj[key];
            }
        }
    }
    
    return sanitized;
};

/**
 * User registration validation middleware
 */
const validateUserRegistration = (req, res, next) => {
    const errors = {};
    const { organizationName, organizationType, contactPerson, email, phone, password, address } = req.body;
    
    // Validate required fields
    const requiredCheck = validateRequired(
        ['organizationName', 'organizationType', 'contactPerson', 'email', 'phone', 'password'],
        req.body
    );
    
    if (!requiredCheck.valid) {
        return res.error('Missing required fields', 400, requiredCheck.errors);
    }
    
    // Validate email
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
        errors.email = emailCheck.message;
    }
    
    // Validate phone
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) {
        errors.phone = phoneCheck.message;
    }
    
    // Validate password
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
        errors.password = passwordCheck.message;
    }
    
    // Validate organization type
    const orgTypeCheck = validateEnum(
        organizationType,
        ['restaurant', 'ngo', 'catering', 'bakery', 'other'],
        'Organization type'
    );
    if (!orgTypeCheck.valid) {
        errors.organizationType = orgTypeCheck.message;
    }
    
    // Validate address if provided
    if (address) {
        if (address.city && typeof address.city !== 'string') {
            errors['address.city'] = 'City must be a string';
        }
        if (address.state && typeof address.state !== 'string') {
            errors['address.state'] = 'State must be a string';
        }
        if (address.zipCode && !/^\d{5,6}$/.test(address.zipCode)) {
            errors['address.zipCode'] = 'ZIP code must be 5-6 digits';
        }
    }
    
    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
        return res.error('Validation failed', 400, errors);
    }
    
    // Sanitize input
    req.body = sanitizeObject(req.body);
    
    next();
};

/**
 * User login validation middleware
 */
const validateUserLogin = (req, res, next) => {
    const errors = {};
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    
    if (Object.keys(errors).length > 0) {
        return res.error('Validation failed', 400, errors);
    }
    
    // Validate email format
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
        errors.email = emailCheck.message;
    }
    
    if (Object.keys(errors).length > 0) {
        return res.error('Validation failed', 400, errors);
    }
    
    // Sanitize input
    req.body.email = sanitizeString(email);
    
    next();
};

/**
 * Donation validation middleware
 */
const validateDonation = (req, res, next) => {
    const errors = {};
    const { foodType, quantity, expiryDate, pickupLocation } = req.body;
    
    // Validate required fields
    const requiredCheck = validateRequired(
        ['foodType', 'quantity', 'expiryDate', 'pickupLocation'],
        req.body
    );
    
    if (!requiredCheck.valid) {
        return res.error('Missing required fields', 400, requiredCheck.errors);
    }
    
    // Validate quantity
    const quantityCheck = validateNumberRange(quantity, 1, 10000);
    if (!quantityCheck.valid) {
        errors.quantity = quantityCheck.message;
    }
    
    // Validate expiry date
    const dateCheck = validateDate(expiryDate);
    if (!dateCheck.valid) {
        errors.expiryDate = dateCheck.message;
    } else {
        // Check if expiry date is in the future
        if (dateCheck.sanitized < new Date()) {
            errors.expiryDate = 'Expiry date must be in the future';
        }
    }
    
    if (Object.keys(errors).length > 0) {
        return res.error('Validation failed', 400, errors);
    }
    
    // Sanitize input
    req.body = sanitizeObject(req.body);
    
    next();
};

/**
 * Order validation middleware
 */
const validateOrder = (req, res, next) => {
    const errors = {};
    const { donationId, pickupTime } = req.body;
    
    // Validate required fields
    if (!donationId) errors.donationId = 'Donation ID is required';
    if (!pickupTime) errors.pickupTime = 'Pickup time is required';
    
    if (Object.keys(errors).length > 0) {
        return res.error('Validation failed', 400, errors);
    }
    
    // Validate donation ID
    const idCheck = validateObjectId(donationId);
    if (!idCheck.valid) {
        errors.donationId = idCheck.message;
    }
    
    // Validate pickup time
    const dateCheck = validateDate(pickupTime);
    if (!dateCheck.valid) {
        errors.pickupTime = dateCheck.message;
    } else {
        // Check if pickup time is in the future
        if (dateCheck.sanitized < new Date()) {
            errors.pickupTime = 'Pickup time must be in the future';
        }
    }
    
    if (Object.keys(errors).length > 0) {
        return res.error('Validation failed', 400, errors);
    }
    
    next();
};

/**
 * Message validation middleware
 */
const validateMessage = (req, res, next) => {
    const errors = {};
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    const requiredCheck = validateRequired(['name', 'email', 'subject', 'message'], req.body);
    
    if (!requiredCheck.valid) {
        return res.error('Missing required fields', 400, requiredCheck.errors);
    }
    
    // Validate email
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
        errors.email = emailCheck.message;
    }
    
    // Validate message length
    if (message.length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    
    if (message.length > 1000) {
        errors.message = 'Message must not exceed 1000 characters';
    }
    
    if (Object.keys(errors).length > 0) {
        return res.error('Validation failed', 400, errors);
    }
    
    // Sanitize input
    req.body = sanitizeObject(req.body);
    
    next();
};

/**
 * ID parameter validation middleware
 */
const validateIdParam = (paramName = 'id') => {
    return (req, res, next) => {
        const id = req.params[paramName];
        const idCheck = validateObjectId(id);
        
        if (!idCheck.valid) {
            return res.error(idCheck.message, 400);
        }
        
        next();
    };
};

/**
 * Query parameter validation middleware
 */
const validateQueryParams = (allowedParams) => {
    return (req, res, next) => {
        const queryKeys = Object.keys(req.query);
        const invalidParams = queryKeys.filter(key => !allowedParams.includes(key));
        
        if (invalidParams.length > 0) {
            return res.error(
                `Invalid query parameters: ${invalidParams.join(', ')}`,
                400,
                { allowedParams }
            );
        }
        
        next();
    };
};

/**
 * Pagination validation middleware
 */
const validatePagination = (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    
    const pageCheck = validateNumberRange(page, 1, 1000);
    const limitCheck = validateNumberRange(limit, 1, 100);
    
    if (!pageCheck.valid) {
        return res.error('Invalid page number', 400, { page: pageCheck.message });
    }
    
    if (!limitCheck.valid) {
        return res.error('Invalid limit', 400, { limit: limitCheck.message });
    }
    
    req.pagination = {
        page: pageCheck.sanitized,
        limit: limitCheck.sanitized,
        skip: (pageCheck.sanitized - 1) * limitCheck.sanitized
    };
    
    next();
};

module.exports = {
    // Validation functions
    validateEmail,
    validatePhone,
    validatePassword,
    validateObjectId,
    validateURL,
    validateDate,
    validateNumberRange,
    validateEnum,
    validateRequired,
    sanitizeString,
    sanitizeObject,
    
    // Middleware
    validateUserRegistration,
    validateUserLogin,
    validateDonation,
    validateOrder,
    validateMessage,
    validateIdParam,
    validateQueryParams,
    validatePagination,
    
    // Error class
    ValidationError
};
