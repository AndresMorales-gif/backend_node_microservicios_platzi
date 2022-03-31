const jwt = require('jsonwebtoken');

const sign = (data) => {
  console.log(data);
  return jwt.sign(data, 'secreto');
}

module.exports = {
  sign
}