import winston from 'winston'
import path from 'path'

const logDir = 'logs'

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`
})

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: path.join(logDir, 'app.log'),
            level: 'info'
        }),

        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        })
    ],
});

export default logger
