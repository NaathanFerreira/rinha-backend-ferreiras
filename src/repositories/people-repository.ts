import { Person, Prisma } from "@prisma/client";

export interface PeopleRepository {
  count(): Promise<number>
  findById(personId: string): Promise<Person | null>
  fintByNickname(nickname: string): Promise<Person | null>
  searchMany(query: string): Promise<Person[]>;
  create(data: Prisma.PersonCreateInput): Promise<Person>;
}
