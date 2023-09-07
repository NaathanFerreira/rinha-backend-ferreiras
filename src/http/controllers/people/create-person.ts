import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPerson(req: FastifyRequest, reply: FastifyReply) {

  const createPersonBodySchema = z.object({
    apelido: z.string().max(32, {message: 'Apelido não deve ultrapassar 32 caracteres' }),
    nome: z.string().max(100, {message: 'Nome não deve ultrapassar 32 caracteres' }),
    nascimento: z.string(),
    stack: z.string().max(32, { message: 'Nome da stack não deve ultrapassar 32 caracteres' }).array()
  });

  const { apelido, nome, nascimento, stack } = createPersonBodySchema.parse(req.body)

  console.log(apelido, nome, nascimento, stack)

  return reply.status(201).send();
}
