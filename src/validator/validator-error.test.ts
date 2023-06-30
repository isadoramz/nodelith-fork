import { ValidatorError } from './validator-error'

describe('ValidatorError', () => {
  it('should be instance of ValidatorError', () => {
    expect(() => {
      throw new ValidatorError('Custom Validator Error Message')
    }).toThrow(ValidatorError)
  })

  it('should have name equal to "ValidatorError"', () => {
    try {
      throw new ValidatorError('Custom Validator Error Message')
    } catch (error) {
      expect(error.name).toBe('ValidatorError');
    }
  })

  it('should include error message when one is passed', () => {
    expect(() => {
      throw new ValidatorError('Custom Validator Error Message')
    }).toThrow('Custom Validator Error Message')
  })
})