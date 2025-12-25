import { prisma } from '../config/prisma';

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
    if (!bookmark) throw new Error( "Not found");
    if (bookmark.userId !== userId) throw new Error( "Forbidden");

    await prisma.bookmark.delete({ where: { id } });
  },
};
