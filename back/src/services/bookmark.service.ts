import { prisma } from '../config/prisma';
import { ApiError } from '../utils/ApiError';

export const bookmarkService = {
  async create(userId: string, data: any) {
    return prisma.bookmark.create({
      data: { ...data, userId },
    });
  },

  async getAll(userId: string) {
    return prisma.bookmark.findMany({ where: { userId } });
  },

  async delete(userId: string, id: string) {
    const bookmark = await prisma.bookmark.findUnique({ where: { id } });
    if (!bookmark) throw new ApiError(404, "Not found");
    if (bookmark.userId !== userId) throw new ApiError(403, "Forbidden");

    await prisma.bookmark.delete({ where: { id } });
  },
};
