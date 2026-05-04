const { Router } = require('express');
const controller = require('./auth.controller');
const { validate } = require('../../middleware/validate');
const v = require('./auth.validator');

const router = Router();

router.post('/register', validate(v.register), controller.register);
router.post('/login', validate(v.login), controller.login);

module.exports = router;