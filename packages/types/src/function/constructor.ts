export type Constructor<Instance = any, Arguments extends Array<any> = Array<any>> = {
  new (...args: Arguments): Instance
}