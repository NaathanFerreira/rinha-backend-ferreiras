import { Person, Prisma } from "@prisma/client";

export interface PeopleRepository {
  fintByNickname(nickname: string): Promise<Person | null>
  create(data: Prisma.PersonCreateInput): Promise<Person>;
}
