const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().required(),
});

module.exports = { create };