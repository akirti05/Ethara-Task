const activityService = require('./activity.service');
const { success } = require('../../utils/response');

const getProjectActivity = async (req, res, next) => {
  try {
    const logs = await activityService.getProjectActivity(req.params.projectId);
    success(res, logs);
  } catch (err) { next(err); }
};

module.exports = { getProjectActivity };