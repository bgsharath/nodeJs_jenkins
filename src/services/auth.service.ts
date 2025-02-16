import { UserRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/hashUtils';
import { generateToken } from '../utils/authUtils';

export const AuthService = {
  signup: async (userData: { firstName: string; lastName: string; age: number; gender:string; skills:string; email: string; password: string }) => {
    const user = await UserRepository.findByEmail(userData.email);
    if(user) throw new Error('User Already Exists');
    const hashedPassword = await hashPassword(userData.password);
    return UserRepository.create({ ...userData, password: hashedPassword });
  },

  login: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken(user.id);
    return { token, user };
  }
};
