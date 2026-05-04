const projectService = require('./project.service');
const { success } = require('../../utils/response');

const create = async (req, res, next) => {
  try {
    const project = await projectService.create(req.body, req.user.id);
    success(res, project, 201);
  } catch (err) { next(err); }
};

const list = async (req, res, next) => {
  try {
    const projects = await projectService.list(req.user.id);
    success(res, projects);
  } catch (err) { next(err); }
};

module.exports = { create, list };