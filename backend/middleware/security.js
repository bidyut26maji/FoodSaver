/**
 * Security Middleware
 * Implements various security best practices and protections
 */

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

/**
 * Helmet configuration for security headers
 */
const helmetConfig = helmet({
    // Content Security Policy
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    
    // Strict Transport Security
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },
    
    // X-Frame-Options
    frameguard: {
        action: 'deny',
    },
    
    // X-Content-Type-Options
    noSniff: true,
    
    // X-XSS-Protection
    xssFilter: true,
    
    // Referrer Policy
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
    },
    
    // Hide X-Powered-By header
    hidePoweredBy: true,
    
    // DNS Prefetch Control
    dnsPrefetchControl: {
        allow: false,
    },
    
    // IE No Open
    ieNoOpen: true,
    
    // Expect-CT
    expectCt: {
        maxAge: 86400,
        enforce: true,
    },
});

/**
 * MongoDB injection prevention
 * Sanitizes user input to prevent NoSQL injection attacks
 */
const mongoSanitizeConfig = mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.warn(`⚠️  Potential MongoDB injection attempt detected: ${key}`);
    },
});

/**
 * XSS protection
 * Cleans user input from malicious HTML/JS code
 */
const xssConfig = xss();

/**
 * HTTP Parameter Pollution protection
 * Prevents parameter pollution attacks
 */
const hppConfig = hpp({
    whitelist: [
        'page',
        'limit',
        'sort',
        'fields',
        'organizationType',
        'status',
        'role',
    ],
});

/**
 * CORS configuration
 */
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
            'http://localhost:3000',
            'http://localhost:3001',
        ];
        
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Per-Page'],
    maxAge: 86400, // 24 hours
};

/**
 * Request size limiter
 * Prevents large payload attacks
 */
const requestSizeLimiter = {
    json: { limit: '10mb' },
    urlencoded: { limit: '10mb', extended: true },
};

/**
 * IP whitelist middleware
 * Restricts access to specific IP addresses (for admin routes)
 */
const ipWhitelist = (allowedIPs = []) => {
    return (req, res, next) => {
        const clientIP = req.ip || req.connection.remoteAddress;
        
        if (allowedIPs.length === 0 || allowedIPs.includes(clientIP)) {
            return next();
        }
        
        console.warn(`⚠️  Unauthorized IP access attempt: ${clientIP}`);
        return res.status(403).json({
            status: 'error',
            message: 'Access denied from your IP address',
            timestamp: new Date().toISOString(),
        });
    };
};

/**
 * Request logger for security monitoring
 */
const securityLogger = (req, res, next) => {
    const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
        referer: req.get('referer'),
    };
    
    // Log suspicious patterns
    const suspiciousPatterns = [
        /(\.\.|\/etc\/|\/proc\/|\/sys\/)/i, // Path traversal
        /(union|select|insert|update|delete|drop|create|alter)/i, // SQL injection
        /(<script|javascript:|onerror=|onload=)/i, // XSS
        /(eval\(|exec\(|system\()/i, // Code injection
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
        pattern.test(req.path) || 
        pattern.test(JSON.stringify(req.query)) ||
        pattern.test(JSON.stringify(req.body))
    );
    
    if (isSuspicious) {
        console.warn('⚠️  Suspicious request detected:', logData);
    }
    
    next();
};

/**
 * API key validation middleware
 */
const validateApiKey = (req, res, next) => {
    const apiKey = req.header('X-API-Key');
    const validApiKeys = process.env.API_KEYS?.split(',') || [];
    
    if (validApiKeys.length === 0) {
        // If no API keys configured, skip validation
        return next();
    }
    
    if (!apiKey || !validApiKeys.includes(apiKey)) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or missing API key',
            timestamp: new Date().toISOString(),
        });
    }
    
    next();
};

/**
 * Request timeout middleware
 * Prevents long-running requests from blocking the server
 */
const requestTimeout = (timeout = 30000) => {
    return (req, res, next) => {
        req.setTimeout(timeout, () => {
            res.status(408).json({
                status: 'error',
                message: 'Request timeout',
                timestamp: new Date().toISOString(),
            });
        });
        next();
    };
};

/**
 * Brute force protection for specific routes
 */
const bruteForceProtection = () => {
    const attempts = new Map();
    const MAX_ATTEMPTS = 5;
    const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes
    
    return (req, res, next) => {
        const key = `${req.ip}:${req.path}`;
        const now = Date.now();
        
        if (attempts.has(key)) {
            const data = attempts.get(key);
            
            // Check if still blocked
            if (data.blockedUntil && now < data.blockedUntil) {
                const remainingTime = Math.ceil((data.blockedUntil - now) / 1000 / 60);
                return res.status(429).json({
                    status: 'error',
                    message: `Too many failed attempts. Try again in ${remainingTime} minutes`,
                    timestamp: new Date().toISOString(),
                });
            }
            
            // Reset if block expired
            if (data.blockedUntil && now >= data.blockedUntil) {
                attempts.delete(key);
            }
        }
        
        // Track failed attempts
        res.on('finish', () => {
            if (res.statusCode === 401 || res.statusCode === 403) {
                const data = attempts.get(key) || { count: 0 };
                data.count++;
                
                if (data.count >= MAX_ATTEMPTS) {
                    data.blockedUntil = now + BLOCK_DURATION;
                    console.warn(`⚠️  IP blocked due to brute force: ${req.ip}`);
                }
                
                attempts.set(key, data);
            } else if (res.statusCode === 200) {
                // Reset on successful request
                attempts.delete(key);
            }
        });
        
        next();
    };
};

/**
 * Content type validation
 */
const validateContentType = (allowedTypes = ['application/json']) => {
    return (req, res, next) => {
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const contentType = req.get('content-type');
            
            if (!contentType || !allowedTypes.some(type => contentType.includes(type))) {
                return res.status(415).json({
                    status: 'error',
                    message: 'Unsupported content type',
                    allowedTypes,
                    timestamp: new Date().toISOString(),
                });
            }
        }
        next();
    };
};

/**
 * Security headers middleware
 */
const securityHeaders = (req, res, next) => {
    // Remove sensitive headers
    res.removeHeader('X-Powered-By');
    
    // Add custom security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    next();
};

/**
 * Initialize all security middleware
 */
const initSecurity = (app) => {
    // Apply Helmet
    app.use(helmetConfig);
    
    // Apply MongoDB sanitization
    app.use(mongoSanitizeConfig);
    
    // Apply XSS protection
    app.use(xssConfig);
    
    // Apply HPP protection
    app.use(hppConfig);
    
    // Apply security headers
    app.use(securityHeaders);
    
    // Apply security logger
    app.use(securityLogger);
    
    // Apply request timeout
    app.use(requestTimeout());
    
    // Apply content type validation
    app.use(validateContentType());
    
    console.log('✅ Security middleware initialized');
};

module.exports = {
    helmetConfig,
    mongoSanitizeConfig,
    xssConfig,
    hppConfig,
    corsOptions,
    requestSizeLimiter,
    ipWhitelist,
    securityLogger,
    validateApiKey,
    requestTimeout,
    bruteForceProtection,
    validateContentType,
    securityHeaders,
    initSecurity,
};
