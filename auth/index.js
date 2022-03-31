const jwt = require('jsonwebtoken');

const sign = (data) => {
  return jwt.sign(data, 'secreto');
}

module.exports = {
  sign
}