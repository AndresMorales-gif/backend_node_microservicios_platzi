const response = require('./response');

const errors = (error, req, res, next) => {
  console.log('[error]', error);

  const message = error.message || 'Error interno';
  const status = error.statusCode || 500;

  response.error(res, message, status)
};

module.exports = errors;