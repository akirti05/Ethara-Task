const prisma = require('../../config/database');

const activityService = require('../activity/activity.service');
const AppError = require('../../utils/AppError');
const PRIORITY_WEIGHT = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };

const TASK_SELECT = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  tags: true,
  position: true,
  createdAt: true,
  updatedAt: true,
  projectId: true,
  creator: { select: { id: true, name: true, avatarUrl: true } },
  assignee: { select: { id: true, name: true, avatarUrl: true } },
};

const assertTaskInProject = async (taskId, projectId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { id: true, projectId: true, creatorId: true, assigneeId: true, status: true, priority: true, title: true },
  });
  if (!task) throw new AppError('Task not found', 404);
  if (task.projectId !== projectId) throw new AppError('Invalid project', 400);
  return task;
};

const create = async (projectId, data, userId) => {
  const task = await prisma.task.create({
    data: { ...data, projectId, creatorId: userId },
    select: TASK_SELECT,
  });

  await activityService.log({
    projectId,
    userId,
    action: 'TASK_CREATED',
    entityType: 'task',
    entityId: task.id,
    metadata: { title: task.title },
  });

  return task;
};

const list = async (projectId, userId, role, query) => {
  const { page, limit } = query;
  const skip = (page - 1) * limit;

  const where = { projectId };

  if (role === 'MEMBER') {
    where.OR = [{ creatorId: userId }, { assigneeId: userId }];
  }

  const [tasks, total] = await prisma.$transaction([
    prisma.task.findMany({ where, select: TASK_SELECT, skip, take: limit }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total, page, limit };
};

module.exports = { create, list };