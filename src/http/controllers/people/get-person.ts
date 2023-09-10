import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaPeopleRepository } from "../../../repositories/prisma/prisma-people-repository";
import { GetPersonUseCase } from "../../../use-cases/get-person";
import { ResourceNotFoundError } from "../../../use-cases/errors/ResourceNotFoundError";

export async function getPerson(req: FastifyRequest, reply: FastifyReply) {
  const getPersonParamsSchema = z.object({
    personId: z.string().uuid(),
  });

  const { personId } = getPersonParamsSchema.parse(req.params)

  try {
    const prismaPeopleRepository = new PrismaPeopleRepository()
    const getPersonUseCase = new GetPersonUseCase(prismaPeopleRepository)

    const { person } = await getPersonUseCase.execute({ personId })

    return reply.status(200).send({...person})
  } catch (err) {
    if(err instanceof ResourceNotFoundError){
      return reply.status(404).send({
        message: err.message
      })
    }
  }
}
