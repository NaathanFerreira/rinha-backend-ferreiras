import { Person } from "@prisma/client";
import { PeopleRepository } from "../repositories/people-repository";
import { NicknameAlreadyExistsError } from "./errors/NicknameAlreadyExistsError";

interface CreatePersonUseCaseRequest {
  apelido: string;
  nome: string;
  nascimento: string;
  stack?: Array<string>
}

interface CreatePersonUseCaseResponse {
  person: Person;
}

export class CreatePersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    apelido,
    nome,
    nascimento,
    stack
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {

    const personWithSameNickname = await this.peopleRepository.fintByNickname(apelido)

    if(personWithSameNickname){
      throw new NicknameAlreadyExistsError()
    }

    const person = await this.peopleRepository.create({
      apelido, nome, nascimento, stack
    });

    return { person };
  }
}
