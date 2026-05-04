const prisma = require('../../config/database');

const log = async ({ projectId, userId, action }) => {
  await prisma.activityLog.create({
    data: { projectId, userId, action },
  });
};

module.exports = { log };