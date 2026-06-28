import prisma from "../prisma";

const authRepository = {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    return await prisma.user.create({
      data: { email, password, name },
    });
  },

  async updateUserPassword(id: string, password: string) {
    return await prisma.user.update({
      where: { id },
      data: { password },
    });
  },

  async updateUserData(id: string, data: { name?: string; email?: string }) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },
};

export default authRepository;
