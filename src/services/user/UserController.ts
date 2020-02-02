import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export const createUser = async (body: any) => {
  const userRepository = getRepository(User);
  let { email, name } = body;
  let user = new User();
  user.email = email.toLowerCase();
  user.name = name;

  await userRepository.save(user);
  return user;
};
