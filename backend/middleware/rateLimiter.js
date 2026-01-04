/**
 * Rate Limiting Middleware
 * Prevents API abuse and DDoS attacks
 */

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

/**
 * Create Redis client for distributed rate limiting (optional)
 * Falls back to memory store if Redis is not available
 */
let redisClient;
let redisStore;

const initRedis = async () => {
    if (process.env.REDIS_URL) {
        try {
            redisClient = redis.createClient({
                url: process.env.REDIS_URL,
                socket: {
                    reconnectStrategy: (retries) => {
                        if (retries > 10) {
                            console.error('❌ Redis connection failed after 10 retries');
                            return new Error('Redis connection failed');
                        }
                        return retries * 100;
                    }
                }
            });

            redisClient.on('error', (err) => {
                console.error('❌ Redis Client Error:', err);
            });

            redisClient.on('connect', () => {
                console.log('✅ Redis connected for rate limiting');
            });

            await redisClient.connect();

            redisStore = new RedisStore({
                client: redisClient,
                prefix: 'rl:',
            });
        } catch (error) {
            console.warn('⚠️  Redis not available, using memory store for rate limiting');
            redisClient = null;
            redisStore = null;
        }
    }
};

// Initialize Redis connection
initRedis();

/**
 * Custom rate limit handler
 */
const rateLimitHandler = (req, res) => {
    res.status(429).json({
        status: 'error',
        message: 'Too many requests, please try again later',
        retryAfter: res.getHeader('Retry-After'),
        timestamp: new Date().toISOString()
    });
};

/**
 * Skip rate limiting for certain conditions
 */
const skipRateLimit = (req) => {
    // Skip rate limiting for health check endpoint
    if (req.path === '/api/health') return true;
    
    // Skip for trusted IPs (if configured)
    const trustedIPs = process.env.TRUSTED_IPS?.split(',') || [];
    if (trustedIPs.includes(req.ip)) return true;
    
    return false;
};

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    store: redisStore, // Use Redis store if available, otherwise memory store
    handler: rateLimitHandler,
    skip: skipRateLimit,
    keyGenerator: (req) => {
        // Use IP address as key
        return req.ip || req.connection.remoteAddress;
    }
});

/**
 * Strict rate limiter for authentication endpoints
 * 5 requests per 15 minutes per IP
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many authentication attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
    skipSuccessfulRequests: true, // Don't count successful requests
    keyGenerator: (req) => {
        // Use combination of IP and email for more granular control
        const email = req.body?.email || 'unknown';
        return `${req.ip}:${email}`;
    }
});

/**
 * Registration rate limiter
 * 3 registrations per hour per IP
 */
const registrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 registrations per hour
    message: 'Too many registration attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
    skipSuccessfulRequests: false,
});

/**
 * Password reset rate limiter
 * 3 requests per hour per IP
 */
const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 password reset requests per hour
    message: 'Too many password reset attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
});

/**
 * API creation rate limiter (for donations, orders, etc.)
 * 20 requests per hour per IP
 */
const creationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 creation requests per hour
    message: 'Too many creation requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
});

/**
 * File upload rate limiter
 * 10 uploads per hour per IP
 */
const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 uploads per hour
    message: 'Too many upload requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
});

/**
 * Search/Query rate limiter
 * 50 requests per minute per IP
 */
const searchLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 50, // Limit each IP to 50 search requests per minute
    message: 'Too many search requests, please slow down',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
});

/**
 * Contact form rate limiter
 * 5 messages per hour per IP
 */
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 contact form submissions per hour
    message: 'Too many contact form submissions, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
});

/**
 * Admin operations rate limiter
 * 100 requests per 15 minutes per IP
 */
const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 admin requests per windowMs
    message: 'Too many admin requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    handler: rateLimitHandler,
});

/**
 * Create custom rate limiter with specific options
 */
const createCustomLimiter = (options = {}) => {
    const defaultOptions = {
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        store: redisStore,
        handler: rateLimitHandler,
    };

    return rateLimit({ ...defaultOptions, ...options });
};

/**
 * Rate limit info middleware
 * Adds rate limit information to response headers
 */
const rateLimitInfo = (req, res, next) => {
    res.setHeader('X-RateLimit-Policy', 'FoodSaver API Rate Limiting');
    next();
};

/**
 * Cleanup function for graceful shutdown
 */
const cleanup = async () => {
    if (redisClient) {
        try {
            await redisClient.quit();
            console.log('✅ Redis connection closed');
        } catch (error) {
            console.error('❌ Error closing Redis connection:', error);
        }
    }
};

// Handle process termination
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);

module.exports = {
    generalLimiter,
    authLimiter,
    registrationLimiter,
    passwordResetLimiter,
    creationLimiter,
    uploadLimiter,
    searchLimiter,
    contactLimiter,
    adminLimiter,
    createCustomLimiter,
    rateLimitInfo,
    cleanup
};
