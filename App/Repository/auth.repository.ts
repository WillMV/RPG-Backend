import { User } from "../../generated/prisma/client";
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
      data: { email, password, name, emailValidated: false },
    });
  },

  async updateUserPassword(id: string, password: string) {
    return await prisma.user.update({
      where: { id },
      data: { password },
    });
  },

  async updateUserData(
    id: string,
    data: Omit<
      Partial<User>,
      "createdAt" | "updatedAt" | "emailValidated" | "id" | "password"
    >,
  ) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  async validateUserEmail(id: string) {
    return await prisma.user.update({
      where: { id },
      data: { emailValidated: true },
    });
  },

  async createOTP({
    code,
    expiresAt,
    type,
    userId,
  }: {
    code: string;
    userId: string;
    type: string;
    expiresAt: Date;
  }) {
    return await prisma.otpToken.create({
      data: {
        code,
        expiresAt,
        type,
        userId,
      },
    });
  },

  async getLastOTP(userId: string, type: string) {
    console.log(userId);
    const otpToken = await prisma.otpToken.findFirst({
      where: {
        AND: {
          userId: { equals: userId },
          type: { equals: type },
          expiresAt: { gt: new Date() },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    console.log(otpToken);
    return otpToken?.code;
  },
};

export default authRepository;
