export class InitializationError extends Error {
  public readonly path?: string | undefined

  constructor(message?: string, path?: string) {
    super(message)
    this.name = 'InitializationError'
    this.path = path
  }
}
