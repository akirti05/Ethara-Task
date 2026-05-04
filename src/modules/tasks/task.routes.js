const { Router } = require('express');
const controller = require('./task.controller');
const { authenticate } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const v = require('./task.validator');

const router = Router({ mergeParams: true });

router.use(authenticate);

router.post('/', validate(v.create), controller.create);
router.get('/', controller.list);
router.patch('/:taskId', validate(v.update), controller.update);
router.delete('/:taskId', controller.remove);

module.exports = router;