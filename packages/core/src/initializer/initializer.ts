import * as Types from '@nodelith/types'

/**
 * Abstract class representing an initializer.
 * 
 * @template Result - The type returned after initialization
 */
export abstract class Initializer<Result extends Record<string, any> = Record<string, any>> {

  /**
   * @description Checks if a given constructor class extends the Initializer class.
   * @param {Types.Constructor} constructor - The constructor to check.
   * @returns {boolean} - True if the constructor extends Initializer; otherwise, false.
   */
  static isExtendedBy(constructor: Types.Constructor): boolean {
    const prototype = Object.getPrototypeOf(constructor.prototype);

    if (!prototype || prototype === Function.prototype) {
      return false;
    }

    if (prototype === Initializer.prototype) {
      return true;
    }

    return Initializer.isExtendedBy({ prototype } as Types.Constructor);
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
