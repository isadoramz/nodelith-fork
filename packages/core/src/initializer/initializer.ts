export interface Initializer<Result extends Record<string, any> = Record<string, any>> {
  initialize(): Promise<Result>
  terminate?(): Promise<void>
}