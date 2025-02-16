import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';

export const UserService = {
  updateUser: async (id: string, data: Partial<User>) => UserRepository.update(id, data)
};