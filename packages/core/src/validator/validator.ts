import { Value } from '../value'

/*
 * Validates an unknown value against a schema.
 */
export interface Validator<V = Value> {
  /**
   * @description Attempts to cast a value according to the schema, acting as a type guard.
   * @returns {boolean} - Returns true if the value conforms to the schema, otherwise false.
   */
  cast(value: unknown): value is V

  /**
   * @description Validates a value against the schema.
   * @returns {boolean} - Returns true if validation succeeds, otherwise false.
   */
  allows(value: unknown): boolean

  /**
   * @description Validates a value against the schema.
   * @returns {[V, Error | undefined]} - Returns a tuple where the first element is the validated (or cast) value if validation succeeds, otherwise undefined. The second element is the validation error, or undefined if no error occurred.
   */
  validate(value: unknown): [Value, Error | undefined]

  /**
   * @description Validates a value against the schema. If validation succeeds, returns true. Otherwise, throws a ValidationError.
   * @returns {true} - Returns true if validation is successful.
   * @throws {ValidationError} - Throws an error if validation fails.
   */
  assert(value: unknown): true | never

  /**
   * @description Validates a value and returns the validation error if validation fails.
   * @returns {Error | undefined} - Returns the ValidationError if validation fails, otherwise undefined.
   */
  extractValidationError(value: unknown): Error | undefined
}
