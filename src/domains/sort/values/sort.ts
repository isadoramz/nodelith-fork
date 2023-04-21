import { SortOrder } from './sort-order'

export type Sort<T extends string> = {
  offset?: number
  limit?: number
  property?: T
  order?: SortOrder
};
