import { InitializationError } from './initialization-error'

describe('InitializationError', () => {
  it('should be instance of InitializationError', () => {
    expect(() => {
      throw new InitializationError('Custom Validator Error Message')
    }).toThrow(InitializationError)
  })

  it('should have name equal to "InitializationError"', () => {
    try {
      throw new InitializationError('Custom Validator Error Message')
    } catch (error) {
      expect(error.name).toBe('InitializationError');
    }
  })

  it('should include error message when one is passed', () => {
    expect(() => {
      throw new InitializationError('Custom Validator Error Message')
    }).toThrow('Custom Validator Error Message')
  })
})