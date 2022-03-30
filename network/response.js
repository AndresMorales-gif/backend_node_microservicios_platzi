exports.success = (res, message, status) => {
  const statusCode = status || 200;
  const statusMessage = message || 'Ok';
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage
  });
}

exports.error = (res, message, status) => {
  const statusCode = status || 500;
  const statusMessage = message || 'Internal server error';
  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: statusMessage
  });
}