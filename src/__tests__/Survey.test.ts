//A função describe recebe todos os testes que desejamos fazer
//it-> serve para criar um teste
//primeiro paramentro do it é a descrição do teste
//segundo paramentro do it é uma função

import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app)
      .post("/surveys")
      .send({ title: "exemplo", description: "dê uma nota" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all surveys", async () => {
    const response = await request(app).get("/surveys");
    expect(response.body.length).toBe(1);
  });
});
