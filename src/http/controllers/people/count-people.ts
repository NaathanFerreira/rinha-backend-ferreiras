import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPeopleRepository } from "../../../repositories/prisma/prisma-people-repository";
import { CountPeopleUseCase } from "../../../use-cases/count-people";

export async function countPeople(req: FastifyRequest, reply: FastifyReply) {

  const prismaPeopleRepository = new PrismaPeopleRepository()
  const countPeopleUseCase = new CountPeopleUseCase(prismaPeopleRepository)

  const { count } = await countPeopleUseCase.execute()

  return reply.status(200).send(count)
}