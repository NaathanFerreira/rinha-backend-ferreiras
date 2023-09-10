import { Person } from "@prisma/client";
import { PeopleRepository } from "../repositories/people-repository";
import { NicknameAlreadyExistsError } from "./errors/NicknameAlreadyExistsError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface GetPersonUseCaseRequest {
  personId: string
}

interface GetPersonUseCaseResponse {
  person: Person;
}

export class GetPersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    personId
  }: GetPersonUseCaseRequest): Promise<GetPersonUseCaseResponse> {

    const person = await this.peopleRepository.findById(personId)

    if(!person){
      throw new ResourceNotFoundError()
    }

    return { person };
  }
}
