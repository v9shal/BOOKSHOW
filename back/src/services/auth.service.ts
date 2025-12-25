import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export const authService = {
  async register(data: any) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new ApiError(400, "User exists");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: { ...data, password: hashed },
    });

    return this.generateToken(user);
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError(400, "Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ApiError(400, "Invalid credentials");

    const  token =this.generateToken(user);
    return {token,user};
  },

  generateToken(user: any) {
    return jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  },
};
