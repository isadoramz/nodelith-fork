export function accumulate<A>(
  callback: (currentIndex: number, accumulator: A) => A, 
  times: number, 
  initialValue: A,
  initialIndex: number = 0,
) {
  if(initialIndex + 1 > times) {
    return initialValue
 
  }
  return accumulate(callback, times, callback(initialIndex, initialValue), initialIndex + 1)
}
