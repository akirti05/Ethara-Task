const prisma = require('../../config/database');

const create = async ({ title, description, projectId }, userId) => {
  return prisma.task.create({
    data: {
      title,
      description,
      creatorId: userId,

      // ✅ THIS IS THE FIX
      project: {
        connect: {
          id: projectId
        }
      }
    }
  });
};

module.exports = { create };