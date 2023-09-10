import { Person, Prisma } from "@prisma/client";
import { PeopleRepository } from "../people-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPeopleRepository implements PeopleRepository {
  async searchMany(query: string): Promise<Person[]> {
    const people = await prisma.person.findMany({
      where: {
        OR:[
          { apelido: { contains: query, mode: 'insensitive' } },
          { nome: { contains: query, mode: 'insensitive' } },
          // todo, implement insensitive mod on stack field
          { stack: { has: query } },
        ]
      },
      take: 50
    })

    return people
  }

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