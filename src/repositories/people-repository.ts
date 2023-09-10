import { Person, Prisma } from "@prisma/client";

export interface PeopleRepository {
  findById(personId: string): Promise<Person | null>
  fintByNickname(nickname: string): Promise<Person | null>
  create(data: Prisma.PersonCreateInput): Promise<Person>;
}
