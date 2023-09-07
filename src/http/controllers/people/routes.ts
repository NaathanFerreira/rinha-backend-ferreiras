import { FastifyInstance } from "fastify";
import { createPerson } from "./create-person";

export async function peopleRoutes(app: FastifyInstance) {
  app.post("/pessoas", createPerson)
}