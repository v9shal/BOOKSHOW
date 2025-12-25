import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { RegisterInput, LoginInput } from '../validators/auth.schema';

export const AuthService = {
  async register(data: RegisterInput) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new AppError('Email already exists', StatusCodes.CONFLICT);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: { email: data.email, password: hashedPassword },
      select: { id: true, email: true },
    });
  },

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }
    return { id: user.id, email: user.email };
  },

  async getUser(id: string) {
    return prisma.user.findUnique({ where: { id }, select: { id: true, email: true } });
  }
};