import { zip } from './zip'

describe('zip', () => {
  it('should combine arrays in accordance to calback function', () => {
    const arrayOne = [1, 2, 3]
    const arrayTwo = [4, 5, 6]

    const zippedArray = zip(arrayOne, arrayTwo, (itemFromArrayOne, itemFromArrayTwo) => {
      return (itemFromArrayOne ?? 0) + (itemFromArrayTwo ?? 0)
    })

    expect(zippedArray).toEqual([5, 7, 9])
  })

  it('should combine arrays of different size', () => {
    const arrayOne = [1, 2, 3]
    const arrayTwo = [4, 5, 6, 7, 8]

    const zippedArray = zip(arrayOne, arrayTwo, (itemFromArrayOne, itemFromArrayTwo) => {
      return (itemFromArrayOne ?? 0) + (itemFromArrayTwo ?? 0)
    })

    expect(zippedArray).toEqual([5, 7, 9, 7, 8])
  })
})