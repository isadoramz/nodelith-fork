import { accumulate } from "./accumulate"

export function zip<R, U, T>(arrayOfU: U[], arrayOfT: T[],  callback: (u: U | undefined, t:T | undefined) => R) {
  const zippedArrayLenght = Math.max(arrayOfU.length, arrayOfT.length)
  return accumulate((index, acc) => {
    const zippedValue = callback(arrayOfU[index], arrayOfT[index])
    return [ ...acc, zippedValue ]
  }, zippedArrayLenght, [] as R[])
}