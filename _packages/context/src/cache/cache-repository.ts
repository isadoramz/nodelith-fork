import { Value } from '../value'
import { Cached } from './cached'

export interface CacheRepository<ValueType extends Value> {
  set(key: string, value: ValueType): Promise<Cached<ValueType>>
  get(key: string): Promise<Cached<ValueType> | undefined>
}