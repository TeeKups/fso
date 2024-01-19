const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors')

const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');


const mongoUrl = config.MONGODB_URI;
logger.debug('config:', config);
logger.debug('MongoDB URI:', mongoUrl);
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('Connected to mongoDB');
    })
    .catch((error) => {
        logger.error('Error in connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
