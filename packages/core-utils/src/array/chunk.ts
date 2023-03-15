export function chunk<T>(array: T[], chunkkSize: number): T[][] {
  const arrayLength = array.length
  const result: T[][] = []

  for(let index = 0; index < arrayLength; index += chunkkSize) {
    const newChunk = array.slice(index, index + chunkkSize)
    result.push(newChunk)
  }
  
  return result;
}
