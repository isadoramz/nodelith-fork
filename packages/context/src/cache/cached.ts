import { Value } from '../value'

export type Cached<ValueType extends Value> = {
  key: string
  value: ValueType
  cachedAt: Date
}