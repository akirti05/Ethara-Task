// EXACT version you already had
// (same as before — already correct)

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const { v4: uuid } = require('uuid');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Password123', 12);

  const alice = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@taskflow.dev', passwordHash: password },
  });

  const bob = await prisma.user.create({
    data: { name: 'Bob', email: 'bob@taskflow.dev', passwordHash: password },
  });

  const project = await prisma.project.create({
    data: {
      name: 'TaskFlow Demo',
      slug: slugify('TaskFlow Demo') + '-' + uuid().slice(0, 6),
      color: '#6366f1',
      members: {
        create: [
          { userId: alice.id, role: 'ADMIN' },
          { userId: bob.id, role: 'MEMBER' }
        ]
      }
    }
  });

  await prisma.task.createMany({
    data: [
      { title: 'Setup project', projectId: project.id, creatorId: alice.id },
      { title: 'Write docs', projectId: project.id, creatorId: bob.id }
    ]
  });
}

main().finally(() => prisma.$disconnect());