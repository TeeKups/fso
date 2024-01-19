const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(`${request.method} ${request.path}`)
    if (request.body) {
        logger.info(request.body)
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: `Requested endpoint ${request.method} ${request.path} does not exist.` })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
