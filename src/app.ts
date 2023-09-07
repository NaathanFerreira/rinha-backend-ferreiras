import fastify from "fastify";
import { peopleRoutes } from "./http/controllers/people/routes";

export const app = fastify()

app.register(peopleRoutes)