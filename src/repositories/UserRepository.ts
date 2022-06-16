import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

//o "User" passado dentro do getRepository é a entidade
//que desejamos criar ou trabalhar sobre

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export { UserRepository };
