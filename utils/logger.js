import winston from 'winston'
import path from 'path'

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

const logDir = 'logs'

const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        }),
        new transports.File({
            filename: 'logs/app.log'
        })
    ]
});

export default logger