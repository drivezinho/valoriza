import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRquest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUserRquest) {
    const userRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email incorret");
    }

    const userAlreadyExist = await userRepository.findOne({ email });

    if (userAlreadyExist) {
      throw new Error("User Already exists");
    }

    const user = userRepository.create({
      name,
      email,
      admin,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
