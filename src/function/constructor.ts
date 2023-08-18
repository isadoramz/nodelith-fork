export type Constructor<Class = any, Arguments extends Array<any> = Array<any>> = {
  new (...args: Arguments): Class
}