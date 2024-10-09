import { PlainFunction } from '../types'

export const pipe = <T>(initialValue: T, ...modifiers: PlainFunction[]): Promise<T> => {
  return modifiers.reduce(async (value, modifierFunction) => {
    const resolvedValue = await value
    return modifierFunction(resolvedValue)
  }, initialValue as Promise<T>)
}
