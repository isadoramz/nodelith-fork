import { Value } from '../value'

/*
 * Validates an unknown value in accordance to a schema
 */
export interface Validator<V = Value> {
  /**
   * @description Tries to cast a value in accordance to the validator schema behaviouring as a typeguard.
   * @returns {boolean}
   */
  cast(value: unknown): value is V

  /**
   * @description Validates an unkown value, returning true if validation succeeds or false if the validation fails.
   * @returns {boolean}
   */
  validate(value: unknown): boolean

  /**
   * @description Validates an unknow value, returning true if validation succeeds or throwing an error if the validation fails.
   * @returns {true}
   * @throws {ValidationError}
   */
  assert(value: unknown): true | void

  /**
   * @description Checks an unknown value and returns a validation error if any.
   * @returns {Optional<ValidationError>}
   */
  extractValidationError(value: unknown): Error | undefined
}
