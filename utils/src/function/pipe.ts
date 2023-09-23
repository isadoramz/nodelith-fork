export const pipe = <T>(initialValue: T, ...modifiers: ((value: T) => T | Promise<T>)[]): Promise<T> => {
  return modifiers.reduce(async (value, modifierFunction) => {
    const resolvedValue = await value
    return modifierFunction(resolvedValue)
  }, initialValue as Promise<T>)
}
