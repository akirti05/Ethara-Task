const taskService = require('./task.service');
const { success, paginated } = require('../../utils/response');

const create = async (req, res, next) => {
  try {
    const task = await taskService.create(req.body, req.user.id);
    success(res, task, 201);
  } catch (err) { next(err); }
};

const list = async (req, res, next) => {
  try {
    const { tasks, total } = await taskService.list(req.params.projectId, req.query, req.user.id);
    paginated(res, tasks, total, req.query.page, req.query.limit);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const task = await taskService.update(req.params.taskId, req.body, req.user.id);
    success(res, task);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await taskService.remove(req.params.taskId, req.user.id);
    success(res, { message: 'Task deleted' });
  } catch (err) { next(err); }
};

module.exports = { create, list, update, remove };