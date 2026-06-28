import authRepository from "../Repository/auth.repository";
import { hashData, verifyHash } from "../utils/bcript";
import { generateToken } from "../utils/jwt";

const authService = {
  async register(userData: { name: string; password: string; email: string }) {
    const { name, email } = userData;
    const password = await hashData(userData.password);

    const user = await authRepository.createUser({ name, email, password });

    const token = generateToken({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      id: user.id,
    });
    return { token, user };
  },
  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new Error("email or password wrong");

    const validPassword = await verifyHash(password, user.password);

    if (!validPassword) throw new Error("email or password is wrong");

    const token = generateToken({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      id: user.id,
    });
    return { token, user };
  },
  async updateUserData(data: { email: string; name: string }) {},
  async updatePassword(data: {}) {},
};

export default authService;
