import { createLogger, format, transports } from 'winston';
import  'winston-daily-rotate-file';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    createLogger({
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6
        },
        transports: [
            new transports.Console(),
            new transports.File({ 
                filename: 'logs/combined.log' 
            }),
            new transports.DailyRotateFile({
                filename: 'logs/app-%DATE%.log',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
            })
        ]
    })
}