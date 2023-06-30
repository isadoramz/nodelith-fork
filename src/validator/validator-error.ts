export class ValidatorError extends Error {
  public readonly path?: string

  constructor(message?: string, path?: string) {
    super(message)
    this.name = 'ValidatorError'
    this.path = path
  }
}
