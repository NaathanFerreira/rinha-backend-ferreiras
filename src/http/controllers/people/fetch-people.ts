import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaPeopleRepository } from "../../../repositories/prisma/prisma-people-repository";
import { FetchPeopleUseCase } from "../../../use-cases/fetch-people";

export async function fetchPeople(req: FastifyRequest, reply: FastifyReply) {
  const fetchPeopleQuerySchema = z.object({
    t: z.string()
  });

  const queryParse = fetchPeopleQuerySchema.safeParse(req.query)

  if(!queryParse.success){
    return reply.status(400).send()
  }

  const query = queryParse.data.t

  const prismaPeopleRepository = new PrismaPeopleRepository()
  const fetchPeopleUseCase = new FetchPeopleUseCase(prismaPeopleRepository)

  const { people } = await fetchPeopleUseCase.execute({ query })


  return reply.status(200).send([...people])
}
