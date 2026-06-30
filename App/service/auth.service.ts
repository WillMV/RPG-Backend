import { render } from "@react-email/components";
import authRepository from "../Repository/auth.repository";
import emailRepository from "../Repository/email.repository";
import { hashData, verifyHash } from "../utils/bcript";
import { generateToken } from "../utils/jwt";
import { generateCode } from "../utils/otp";
import { sendOTP } from "../utils/templates/sendOtp";
import { getUserPublicData } from "../utils/user";

const authService = {
  async register(userData: { name: string; password: string; email: string }) {
    const { name, email } = userData;
    const password = await hashData(userData.password);

    await authRepository.createUser({ name, email, password });

    const otpCode = generateCode();
    const html = await render(sendOTP({ name, otp: otpCode, email }));

    const info = await emailRepository.send({
      to: [email],
      subject: "Seu código de verificação do RPG",
      html,
    });

    await this.createOTPCode(email, otpCode, "email_validate");

    console.log(info);
  },

  async createOTPCode(email: string, code: string, type: string) {
    const now = new Date();
    const expiresAt = new Date(now.setMinutes(now.getMinutes() + 10));

    const user = await authRepository.findUserByEmail(email);

    if (!user) throw new Error("User not exists");

    const hashedCode = await hashData(code);

    await authRepository.createOTP({
      code: hashedCode,
      userId: user.id,
      type,
      expiresAt,
    });
  },

  async validateEmail(email: string, code: string) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) throw new Error("User not exists");

    const hashedCode = await authRepository.getLastOTP(
      user.id,
      "email_validate",
    );
    if (!hashedCode) throw new Error("invalid code");

    const isValid = await verifyHash(code, hashedCode);
    if (!isValid) throw new Error("invalid code");

    await authRepository.validateUserEmail(user.id);

    const token = generateToken(getUserPublicData(user));

    return { token, user: getUserPublicData(user) };
  },

  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) throw new Error("email or password wrong");

    const validPassword = await verifyHash(password, user.password);

    if (!validPassword) throw new Error("email or password is wrong");

    if (!user.emailValidated) throw new Error("Account not verfied");
    const token = generateToken({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      id: user.id,
    });
    return { token, user: getUserPublicData(user) };
  },
  async updatePassword({
    newPassword,
    oldPassword,
    userEmail,
  }: {
    userEmail: string;
    newPassword: string;
    oldPassword: string;
  }) {
    const user = await authRepository.findUserByEmail(userEmail);
    if (!user) throw new Error("invalid data");

    const isValidPassword = verifyHash(oldPassword, user.password);

    if (!isValidPassword) throw new Error("invalid data");

    const hashedPassword = await hashData(newPassword);

    const updatedUser = await authRepository.updateUserPassword(
      user.id,
      hashedPassword,
    );
    return getUserPublicData(updatedUser);
  },

  async requestResetPasswordCode(email: string) {
    const code = generateCode();
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new Error("invalid data");

    await this.createOTPCode(email, code, "reset_passoword");
    const html = await render(sendOTP({ otp: code, email, name: user?.name }));
    await emailRepository.send({
      to: [email],
      html,
      subject: "Recuperação de senha RPG",
    });
  },

  async resetPassword({
    code,
    newPassword,
    userEmail,
  }: {
    userEmail: string;
    newPassword: string;
    code: string;
  }) {
    const user = await authRepository.findUserByEmail(userEmail);
    if (!user) throw new Error("invalid data");
    const hashCode = await authRepository.getLastOTP(
      user.id,
      "reset_passoword",
    );

    if (!hashCode) throw new Error("invalid data");

    const isValid = await verifyHash(code, hashCode);
    if (!isValid) throw new Error("invalid data");
    const hashedPassword = await hashData(newPassword);
    await authRepository.updateUserPassword(user.id, hashedPassword);
  },
};

export default authService;
