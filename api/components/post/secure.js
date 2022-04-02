const auth = require('../../../auth')

const checkAuth = (action) => {
  const middleware = (req, res, next) => {
    
    switch (action) {      
      case 'post':
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }

  };
  return middleware;
};

module.exports = checkAuth;