/**
 * Winston Logger Configuration
 * Provides structured logging with multiple transports
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Custom log format
 */
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

/**
 * Console log format (colorized for development)
 */
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let msg = `${timestamp} [${level}]: ${message}`;
        if (Object.keys(meta).length > 0) {
            msg += ` ${JSON.stringify(meta)}`;
        }
        return msg;
    })
);

/**
 * Create Winston logger instance
 */
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'foodsaver-api' },
    transports: [
        // Write all logs to combined.log
        new winston.transports.File({
            filename: path.join(logsDir, 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        
        // Write error logs to error.log
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        
        // Write warning logs to warn.log
        new winston.transports.File({
            filename: path.join(logsDir, 'warn.log'),
            level: 'warn',
            maxsize: 5242880, // 5MB
            maxFiles: 3,
        }),
    ],
    
    // Handle exceptions and rejections
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(logsDir, 'exceptions.log'),
            maxsize: 5242880,
            maxFiles: 3,
        }),
    ],
    
    rejectionHandlers: [
        new winston.transports.File({
            filename: path.join(logsDir, 'rejections.log'),
            maxsize: 5242880,
            maxFiles: 3,
        }),
    ],
});

/**
 * Add console transport in development
 */
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleFormat,
    }));
}

/**
 * HTTP request logger middleware
 */
const httpLogger = (req, res, next) => {
    const startTime = Date.now();
    
    // Log request
    logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
    });
    
    // Log response
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
        
        logger[logLevel]('Request completed', {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress,
        });
    });
    
    next();
};

/**
 * Database operation logger
 */
const dbLogger = {
    query: (operation, collection, query) => {
        logger.debug('Database query', {
            operation,
            collection,
            query: JSON.stringify(query),
        });
    },
    
    success: (operation, collection, result) => {
        logger.info('Database operation successful', {
            operation,
            collection,
            affected: result?.modifiedCount || result?.deletedCount || result?.length || 1,
        });
    },
    
    error: (operation, collection, error) => {
        logger.error('Database operation failed', {
            operation,
            collection,
            error: error.message,
            stack: error.stack,
        });
    },
};

/**
 * Authentication logger
 */
const authLogger = {
    login: (email, success, ip) => {
        const level = success ? 'info' : 'warn';
        logger[level]('Login attempt', {
            email,
            success,
            ip,
        });
    },
    
    register: (email, organizationType, ip) => {
        logger.info('New registration', {
            email,
            organizationType,
            ip,
        });
    },
    
    logout: (email, ip) => {
        logger.info('User logout', {
            email,
            ip,
        });
    },
    
    passwordReset: (email, ip) => {
        logger.info('Password reset requested', {
            email,
            ip,
        });
    },
};

/**
 * Security event logger
 */
const securityLogger = {
    suspiciousActivity: (type, details, ip) => {
        logger.warn('Suspicious activity detected', {
            type,
            details,
            ip,
        });
    },
    
    rateLimitExceeded: (endpoint, ip) => {
        logger.warn('Rate limit exceeded', {
            endpoint,
            ip,
        });
    },
    
    unauthorizedAccess: (resource, ip, userId) => {
        logger.warn('Unauthorized access attempt', {
            resource,
            ip,
            userId,
        });
    },
    
    validationError: (field, value, ip) => {
        logger.warn('Validation error', {
            field,
            value: typeof value === 'string' ? value.substring(0, 50) : value,
            ip,
        });
    },
};

/**
 * Business logic logger
 */
const businessLogger = {
    donationCreated: (donationId, restaurantId, foodType) => {
        logger.info('New donation created', {
            donationId,
            restaurantId,
            foodType,
        });
    },
    
    orderPlaced: (orderId, donationId, ngoId) => {
        logger.info('New order placed', {
            orderId,
            donationId,
            ngoId,
        });
    },
    
    orderCompleted: (orderId, ngoId) => {
        logger.info('Order completed', {
            orderId,
            ngoId,
        });
    },
    
    userApproved: (userId, organizationType) => {
        logger.info('User approved', {
            userId,
            organizationType,
        });
    },
};

/**
 * Performance logger
 */
const performanceLogger = {
    slowQuery: (operation, duration, query) => {
        logger.warn('Slow database query detected', {
            operation,
            duration: `${duration}ms`,
            query: JSON.stringify(query).substring(0, 200),
        });
    },
    
    slowEndpoint: (endpoint, duration, method) => {
        logger.warn('Slow endpoint detected', {
            endpoint,
            method,
            duration: `${duration}ms`,
        });
    },
    
    highMemoryUsage: (usage) => {
        logger.warn('High memory usage detected', {
            usage: `${Math.round(usage / 1024 / 1024)}MB`,
        });
    },
};

/**
 * Error logger with context
 */
const logError = (error, context = {}) => {
    logger.error('Application error', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        ...context,
    });
};

/**
 * Stream for Morgan HTTP logger
 */
const morganStream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

/**
 * Log application startup
 */
const logStartup = (port, env) => {
    logger.info('Application started', {
        port,
        environment: env,
        nodeVersion: process.version,
        platform: process.platform,
    });
};

/**
 * Log application shutdown
 */
const logShutdown = (reason) => {
    logger.info('Application shutting down', {
        reason,
    });
};

/**
 * Cleanup function
 */
const cleanup = () => {
    return new Promise((resolve) => {
        logger.on('finish', resolve);
        logger.end();
    });
};

// Handle process termination
process.on('SIGTERM', async () => {
    logShutdown('SIGTERM signal received');
    await cleanup();
});

process.on('SIGINT', async () => {
    logShutdown('SIGINT signal received');
    await cleanup();
});

module.exports = {
    logger,
    httpLogger,
    dbLogger,
    authLogger,
    securityLogger,
    businessLogger,
    performanceLogger,
    logError,
    morganStream,
    logStartup,
    logShutdown,
    cleanup,
};
