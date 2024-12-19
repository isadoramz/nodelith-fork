export * from './types'

export * as TypeUtilities from './types'
export * as ArrayUtilities from './array'
export * as ObjectUtilities from './object'
export * as FunctionUtilities from './function'

import * as ArrayUtilities from './array'
import * as ObjectUtilities from './object'
import * as FunctionUtilities from './function'

export const Utilities = {
  Array: ArrayUtilities,
  Object: ObjectUtilities,
  Function: FunctionUtilities,
}
