import logger from '../utils/logger.js'

export function errorHandlerMiddleware(err, req, res, next) {
    logger.error(`Error in ${req.method} ${req.url} - ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
}
