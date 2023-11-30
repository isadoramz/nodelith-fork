export class ParserError extends Error {
  public readonly path?: string | undefined

  constructor(message?: string, path?: string) {
    super(message)
    this.name = 'ParserError'
    this.path = path
  }
}
