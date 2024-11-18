import * as Types from '@nodelith/types'

/**
 * Abstract class representing an initializer.
 * 
 * @template Result - The type returned after initialization
 */
export abstract class Initializer<Result extends Record<string, any> = Record<string, any>> {

  /**
   * @description Checks if a given unknown value extends the Initializer class.
   * @param {any} value - The unknown value to be checked.
   * @returns {boolean} - Whether it extends Initializer or not.
   */
  static isExtendedBy(value: unknown): value is Types.Constructor<Initializer> {
    if (typeof value !== 'function' || !value.prototype) {
      return false;
    }
  
    const prototype = Object.getPrototypeOf(value.prototype);
  
    if (!prototype || prototype === Object.prototype) {
      return false;
    }
  
    if (prototype === Initializer.prototype) {
      return true;
    }
  
    return this.isExtendedBy(Object.getPrototypeOf(value));
  }

  /**
   * @description Optional method to terminate the initializer.
   * @returns {void | Promise<void>} - Returns nothing.
   */
  public terminate?(): void | Promise<void>

  /**
   * @description Abstract method to initialize the initializer with provided arguments.
   * @returns {Result} - Returns nothing.
   */
  public abstract initialize(): Result | Promise<Result>
}
