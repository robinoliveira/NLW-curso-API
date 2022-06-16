import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

//o "Survey" passado dentro do getRepository é a entidade
//que desejamos criar ou trabalhar sobre

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> {}

export { SurveyRepository };
