// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  console.log(error); 
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  errorHandler,
};
