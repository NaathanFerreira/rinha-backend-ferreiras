import fastify from "fastify";
import { peopleRoutes } from "./http/controllers/people/routes";
import { ZodError } from "zod";

export const app = fastify()

app.register(peopleRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      message: "Validation Error. ",
      issues: error.format(),
    });
  }

  return reply.status(500).send({
    message: "Internal Server Error: " + error.message,
  });
});