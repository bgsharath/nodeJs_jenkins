import { PrismaClient, User, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const UserRepository = {
  create: async (data: Prisma.UserCreateInput): Promise<User> => prisma.user.create({ data }),
  findByEmail: async (email: string): Promise<User | null> => prisma.user.findUnique({ where: { email } }),
  findById: async (id: string): Promise<User | null> => prisma.user.findUnique({ where: { id } }),
  update: async (id: string, data: Partial<User>): Promise<User | null> =>
    prisma.user.update({ where: { id }, data }),
  delete: async (id: string): Promise<User | null> => prisma.user.delete({ where: { id } }),
  findAll: async (): Promise<User[]> => prisma.user.findMany(),
};
