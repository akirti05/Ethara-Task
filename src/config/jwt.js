const jwt = require('jsonwebtoken');

const signAccess = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

const verifyAccess = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET);

module.exports = { signAccess, verifyAccess };