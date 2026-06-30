import { hash, compare, genSalt } from "bcrypt";

const saltRounds = 10;

export const hashData = async (data: string): Promise<string> => {
  const salt = await genSalt(saltRounds);
  return await hash(data, salt);
};

export const verifyHash = async (
  originalData: string,
  hashedData: string,
): Promise<boolean> => {
  return await compare(originalData, hashedData);
};
