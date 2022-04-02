const jwt = require('jsonwebtoken');

const error = require('../utils/error');
const config = require('../config');

const NO_TOKEN = 'no token';
const WRONG_FORMAT = 'wrong token format';
const NOT_PERMISSION = 'You do not have permission to do this'

const sign = (data) => {
  return jwt.sign(JSON.stringify(data), config.jwt.secret);
}

const getToken = (auth) => {
  if (!auth) {
    throw error(NO_TOKEN, 400)
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error(WRONG_FORMAT, 400)
  }

  return auth.replace('Bearer ', '');
}

const verify = (token) => {
  return jwt.verify(token, config.jwt.secret);
}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decode = verify(token);
  req.user = decode;
  return decode;  
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw error(NOT_PERMISSION, 401)
    }
  },
  logged: (req) => {
    decodeHeader(req);
  }
}

module.exports = {
  sign,
  check
}