const { Router } = require('express');
const controller = require('./project.controller');
const { authenticate } = require('../../middleware/auth');

const router = Router();

router.use(authenticate);

router.post('/', controller.create);
router.get('/', controller.list);

module.exports = router;
