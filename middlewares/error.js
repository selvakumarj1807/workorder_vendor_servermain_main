module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        });
    }

    if (process.env.NODE_ENV === 'production') {
        let message = err.message;

        if (err.name === "ValidationError") {
            message = Object.values(err.errors).map(value => value.message);
        }

        if (err.message === 'Product not found') {
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        } else if (err.message.startsWith('Resource not found')) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        } else {
            res.status(err.statusCode).json({
                success: false,
                message: message || 'Internal Server Error'
            });
        }
    }
};