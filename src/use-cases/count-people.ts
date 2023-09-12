import { PrismaPeopleRepository } from "../repositories/prisma/prisma-people-repository";

interface CountPeopleUseCaseResponse {
  count: number
}

export class CountPeopleUseCase {
  constructor(private peopleRepository: PrismaPeopleRepository){}

  async execute(): Promise<CountPeopleUseCaseResponse>{

    const count = await this.peopleRepository.count()

    return {count}
  }

}