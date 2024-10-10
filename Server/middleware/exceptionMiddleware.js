const ErrorException = require('../ErrorException');

const exceptionMiddleware = (err, req, res, next) => {
    // Set default values if not provided
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(err);

    // Send the error response
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};

module.exports = exceptionMiddleware;