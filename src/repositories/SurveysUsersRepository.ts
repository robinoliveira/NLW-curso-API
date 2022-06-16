import { EntityRepository, Repository } from "typeorm";
import { SurveysUsers } from "../models/SurveysUsers";

//o "User" passado dentro do getRepository é a entidade
//que desejamos criar ou trabalhar sobre

@EntityRepository(SurveysUsers)
class SurveysUsersRepository extends Repository<SurveysUsers> {}

export { SurveysUsersRepository };
