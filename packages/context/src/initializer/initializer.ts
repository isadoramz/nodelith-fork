// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Initializer<R extends Record<string, any> = Record<string, any>> {
  initialize(): Promise<R>
  terminate?(): Promise<void>
}