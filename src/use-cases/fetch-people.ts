import { Person } from "@prisma/client";
import { PeopleRepository } from "../repositories/people-repository";
import { NicknameAlreadyExistsError } from "./errors/NicknameAlreadyExistsError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface FetchPeopleUseCaseRequest {
  query: string
}

interface FetchPeopleUseCaseResponse {
  people: Person[];
}

export class FetchPeopleUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    query
  }: FetchPeopleUseCaseRequest): Promise<FetchPeopleUseCaseResponse> {

    const people = await this.peopleRepository.searchMany(query)

    return { people };
  }
}
