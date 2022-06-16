import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SurveyRepository } from "../repositories/SurveyRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";
//Prestar atenção que para trabalhar com dados de outras tabelas
//precisamos crirar os seus repositorios

class SendMailController {
  async send_mail(request: Request, response: Response) {
    const { email, survey_id } = request.body;
    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const sendMailRepository = getCustomRepository(SurveysUsersRepository);

    //used to search for a specific user
    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: "user do not exists" });
    }

    const surveyExists = await surveysRepository.findOne({ id: survey_id });
    if (!surveyExists) {
      return response.status(400).json({ error: "Survey does not exists" });
    }

    const survey_user = sendMailRepository.create({
      user_id: user.id,
      survey_id,
    });
    await sendMailRepository.save(survey_user);

    const surveyUserAlreadyExists = usersRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: surveyExists.title,
      description: surveyExists.description,
      link: process.env.URL_MAIL,
      user_id: user.id,
    };

    //need the path when working with handlebars
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsmail.hbs");

    if (surveyUserAlreadyExists) {
      await SendMailService.execute(
        email,
        surveyExists.title,
        variables,
        npsPath
      );
      return response.json(surveyUserAlreadyExists);
    }

    await SendMailService.execute(
      email,
      surveyExists.title,
      variables,
      npsPath
    );
    return response.json(survey_user);
  }
}

export { SendMailController };
