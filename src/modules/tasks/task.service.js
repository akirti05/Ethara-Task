const prisma = require('../../config/database');

const create = async ({ title, description, projectId }, userId) => {
  return prisma.task.create({
    data: {
      title,
      description,
      projectId,
      creatorId: userId
    }
  });
};

module.exports = { create };