export type ConstructorFunction<Class = any, Arguments extends Array<any> = Array<any>> = {
  new (...args: Arguments): Class
}