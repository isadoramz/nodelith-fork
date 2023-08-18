import { accumulate } from './accumulate'

describe('accumulate', () => {
  it('should accumulate result summing up current index and previous accumulator', () => {
    const accumulatorResult = accumulate((index, acc) => {
      return index +  acc
    }, 5, 0)
    expect(accumulatorResult).toBe(10)
  })
})
