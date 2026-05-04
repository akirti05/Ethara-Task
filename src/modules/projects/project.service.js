const prisma = require('../../config/database');
const slugify = require('slugify');

const create = async ({ name }, userId) => {
  return prisma.project.create({
    data: {
      name,
      slug: slugify(name + '-' + Date.now()),
      color: '#6366f1',
      members: {
        create: {
          userId,
          role: 'ADMIN',
        },
      },
    },
  });
};

module.exports = { create };