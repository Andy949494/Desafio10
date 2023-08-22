import winston from "winston";

const log = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug'
        })
    ]
});

export default log;