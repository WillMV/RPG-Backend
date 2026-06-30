import { getRandomNumber } from "./math";

const MAX_LENGTH = 6;

export const generateCode = (): string => {
  let otpCode = "";

  for (let index = 0; index < MAX_LENGTH; index++) {
    const uniCode = getRandomNumber(0, 9);
    otpCode += uniCode;
  }

  return otpCode;
};
