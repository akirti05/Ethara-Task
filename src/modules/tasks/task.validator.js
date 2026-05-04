const Joi = require('joi');

const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
});

const update = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
}).min(1);

module.exports = { create, update };