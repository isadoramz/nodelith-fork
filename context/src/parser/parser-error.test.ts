import { ParserError } from './parser-error'

describe('ParserError', () => {
  it('should be instance of ParserError', () => {
    expect(() => {
      throw new ParserError('Custom Parser Error Message')
    }).toThrow(ParserError)
  })

  it('should have name equal to "ParserError"', () => {
    try {
      throw new ParserError('Custom Parser Error Message')
    } catch (error) {
      expect(error.name).toBe('ParserError');
    }
  })

  it('should include error message when one is passed', () => {
    expect(() => {
      throw new ParserError('Custom Parser Error Message')
    }).toThrow('Custom Parser Error Message')
  })
})