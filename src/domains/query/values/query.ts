import { Filter } from '../../filter'
import { Sort } from '../../sort'
import { ValueObject } from '../../value'

export type Query<V extends ValueObject> = {
  filter?: Filter<V>,
  sort?: Sort<keyof V & string>
} & ({
  filter: Filter<V>,
} | {
  sort: Sort<keyof V & string>
})
