const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to sign JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret-key-12345', {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    });
};

const createSendToken = (user, statusCode, res, message) => {
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        message,
        data: {
            user,
        },
        timestamp: new Date().toISOString(),
    });
};

exports.register = async (req, res, next) => {
    try {
        const {
            organizationName,
            organizationType,
            contactPerson,
            email,
            phone,
            address,
            description,
            password
        } = req.body;

        // 1) Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already in use',
            });
        }

        // 2) Create new user
        const newUser = await User.create({
            organizationName,
            organizationType,
            contactPerson,
            email,
            phone,
            address,
            description,
            password
        });

        // 3) Send token
        createSendToken(newUser, 201, res, 'Registration successful');
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide email and password',
            });
        }

        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect email or password',
            });
        }

        // 3) If everything ok, send token to client
        createSendToken(user, 200, res, 'Login successful');
    } catch (err) {
        next(err);
    }
};
