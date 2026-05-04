const AppError = require('../../utils/AppError')

const requireRole = (role) => (req, _res, next) => {
  if (!req.user || req.user.role !== role) {
    return next(new AppError('Forbidden', 403));
  }
  next();
};

module.exports = { requireRole };