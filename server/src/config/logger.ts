import * as winston from 'winston';

// winston日志配置
export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.timestamp({
            format: () => {
                return new Date(Date.now() + 8 * 3600 * 1000).toISOString();
            }
        }),
        winston.format.printf(({ level, message, label, timestamp, stack }) => {
            return `${timestamp} ${level}: ${message}${stack ? '\n' + stack : ''}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug'
        }),
        new winston.transports.File({
            filename: 'combined.info.log',
            level: 'info',
            maxsize: 1024 * 1024 * 10
        }),
        new winston.transports.File({
            filename: 'combined.error.log',
            level: 'error',
            maxsize: 1024 * 1024 * 10
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'exception.log',
            maxsize: 1024 * 1024 * 10
        })
    ],
    exitOnError: false
});
