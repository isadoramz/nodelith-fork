import { Value } from '../domain'

/*
 * Attempts to parse strings so that a given unkown value fits a schema.
 */
export interface Parser<V = Value> {
  /**
   * @description Attempts to parse strings so that a given unkown value fits the schema.
   * @returns {ParseResult<V>}
   * @throws {ValidationError}
   */
  parse(value: unknown): V | never
}
