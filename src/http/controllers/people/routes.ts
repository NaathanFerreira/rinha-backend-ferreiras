import { FastifyInstance } from "fastify";
import { createPerson } from "./create-person";
import { getPerson } from "./get-person";

export async function peopleRoutes(app: FastifyInstance) {
  app.post("/pessoas", createPerson)
  app.get("/pessoas/:personId", getPerson)
}