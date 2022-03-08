import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticationRequest {
  email: string;
  password: string;
}

class AuthenticationUserService {
  async execute({ email, password }: IAuthenticationRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    const pass = await usersRepositories.findOne({
      password,
    });

    if (!user && !pass) {
      throw new Error("Email/Password incorret");
    }

    const token = { email, password };

    return token;
  }
}

export { AuthenticationUserService };
