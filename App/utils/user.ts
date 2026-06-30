import { User } from "../../generated/prisma/client";

export const getUserPublicData = ({
  createdAt,
  email,
  emailValidated,
  name,
}: User) => ({ createdAt, email, emailValidated, name });
