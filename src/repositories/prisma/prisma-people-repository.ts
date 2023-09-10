import { Person, Prisma } from "@prisma/client";
import { PeopleRepository } from "../people-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPeopleRepository implements PeopleRepository {
  async findById(personId: string): Promise<Person | null> {
    const person = await prisma.person.findFirst({
      where: {
        id: personId,
      },
    });

    return person;
  }

  async fintByNickname(nickname: string): Promise<Person | null> {
    const person = await prisma.person.findFirst({
      where: {
        apelido: nickname,
      },
    });

    return person;
  }

  async create(data: Prisma.PersonCreateInput): Promise<Person> {
    const person = await prisma.person.create({
      data
    })

    return person
  }
}