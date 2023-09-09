import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreatePersonUseCase } from "../../../use-cases/create-person";
import { PrismaPeopleRepository } from "../../../repositories/prisma/prisma-people-repository";
import { NicknameAlreadyExistsError } from "../../../use-cases/errors/NicknameAlreadyExistsError";

export async function createPerson(req: FastifyRequest, reply: FastifyReply) {
  const createPersonBodySchema = z.object({
    apelido: z.string().max(32, {message: 'Apelido não deve ultrapassar 32 caracteres' }),
    nome: z.string().max(100, {message: 'Nome não deve ultrapassar 32 caracteres' }),
    nascimento: z.string().refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(value)) return false;
      return true
    }, {
      message: 'Formato de data inválido (AAAA-MM-DD).'
    }),
    stack: z.string().max(32, { message: 'Nome da stack não deve ultrapassar 32 caracteres' }).array().optional()
  });

  const { apelido, nome, nascimento, stack } = createPersonBodySchema.parse(req.body)


  try {
    const prismaPeopleRepository = new PrismaPeopleRepository()
    const createPersonUseCase = new CreatePersonUseCase(prismaPeopleRepository)
    const { person } = await createPersonUseCase.execute({ apelido, nome, nascimento, stack })

    reply.headers({
      Location: `/pessoas/${person.id}`
    })
    return reply.status(201).send({
      person
    });
  } catch(err){
    if(err instanceof NicknameAlreadyExistsError){
      return reply.status(422).send({
        message: err.message
      })
    }
  }
}
