export class ResourceNotFoundError extends Error {
  constructor() {
    super("Não foi possível encontrar recurso");
  }
}
