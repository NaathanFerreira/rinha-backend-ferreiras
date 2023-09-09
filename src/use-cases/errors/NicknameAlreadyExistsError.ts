export class NicknameAlreadyExistsError extends Error {
  constructor() {
    super("Apelido já está em uso");
  }
}
