const winston = require('winston');

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level: 'http',})
    ]
})

exports.addLogger = (req,res,next) => {
    req.logger =logger
    req.logger.http(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`)
}