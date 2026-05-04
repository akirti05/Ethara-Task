const AppError = require('../utils/AppError');
const validate = (schema, target = 'body') => (req, _res, next) => {
  const { error, value } = schema.validate(req[target], {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    return next(new AppError(error.message, 422));
  }

  req[target] = value;
  next();
};

module.exports = { validate };