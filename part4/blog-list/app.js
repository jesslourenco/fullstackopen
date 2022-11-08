const mongoose = require('mongoose');
const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const morgan = require('morgan');

const config = require('./utils/config');
const postsRouter = require('./controllers/posts');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''));

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

// app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);

module.exports = app;
