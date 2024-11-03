export abstract class Initializer<Result extends Record<string, any> = Record<string, any>> {
  abstract initialize(): Promise<Result>
  abstract terminate?(): Promise<void>
}