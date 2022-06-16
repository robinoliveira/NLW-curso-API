import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    //o "User" passado dentro do getRepository é a entidade
    //que desejamos criar ou trabalhar sobre

    const usersRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return response.status(400).json({
        error: "usuario já existe",
      });
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };
