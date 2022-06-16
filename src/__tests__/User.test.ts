//A função describe recebe todos os testes que desejamos fazer
//it-> serve para criar um teste
//primeiro paramentro do it é a descrição do teste
//segundo paramentro do it é uma função

import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "king joao", email: "kingjoao@tadeu" });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a user with same email", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "king patricio", email: "kingjoao@tadeu" });

    expect(response.status).toBe(400);
  });
});
