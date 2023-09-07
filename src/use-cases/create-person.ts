import { PeopleRepository } from "../repositories/people-repository";

interface CreatePersonUseCaseRequest {
  apelido: string;
  nome: string;
  nascimento: string;
  stack: Array<string>
}

interface CreatePersonUseCaseResponse {
  person: {
    apelido: string;
    nome: string;
    nascimento: string;
    stack: Array<string>
  };
}

export class CreatePersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    apelido,
    nome,
    nascimento,
    stack
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {
    const person = await this.peopleRepository.create({
      apelido, nome, nascimento, stack
    });

    return { person };
  }
}
