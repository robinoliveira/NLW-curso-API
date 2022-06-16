import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveyController";
import { SendMailController } from "./controllers/SendMailController";

/**
 * GET => BUSCAR
 * POST =>SALVAR
 * PUT=> DELETAR
 * DELETE=>DELETAR
 * PATCH=>ALTERAÇÃO ESPECÍFICA
 */

// 1º paramentro=>rota
//2º parametro=>resquest, response

const router = Router();

const UserControler = new UserController();
const SurveyControler = new SurveyController();
const SendMailControler = new SendMailController();

router.post("/users", UserControler.create);
router.post("/surveys", SurveyControler.create);
router.get("/surveys", SurveyControler.list);
router.post("/send-mail", SendMailControler.send_mail);

export { router };
