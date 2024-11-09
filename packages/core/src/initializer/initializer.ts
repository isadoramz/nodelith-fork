import{ InitializationFunction } from './initialization-function'

export abstract class Initializer<Result extends Record<string, any> = Record<string, any>> {
  abstract initialize: InitializationFunction<Result>
  abstract terminate?(): Promise<void>
}