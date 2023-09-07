export interface PeopleRepository {
  create(data: {apelido: string;
    nome: string;
    nascimento: string;
    stack: Array<string>}): Promise<{apelido: string;
      nome: string;
      nascimento: string;
      stack: Array<string>}>;
}
