const jwt = require('jsonwebtoken');
const User = require('../models/user');

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }
  next(error);
};

// eslint-disable-next-line consistent-return
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  next();
};

// eslint-disable-next-line consistent-return
const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  request.user = await User.findById(decodedToken.id);

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
