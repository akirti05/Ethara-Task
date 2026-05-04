const bcrypt = require('bcryptjs');
const prisma = require('../../config/database');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');

const register = async ({ name, email, password }) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new AppError('User already exists', 400);

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, passwordHash: hash },
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError('Invalid credentials', 401);

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new AppError('Invalid credentials', 401);

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET
  );

  return { user, token };
};

module.exports = { register, login };