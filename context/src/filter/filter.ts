import { Range }  from '../range'
import { Value } from '../value'

export type Filter<F extends Value> =
  F extends Date ? Date | Date[] | Range<Date> | Range<Date>[] :
  F extends number ? number | number[] | Range<number> | Range<number>[] :
  F extends bigint ? bigint | bigint[] | Range<bigint> | Range<bigint>[] :
  F extends string ? string | string[] :
  F extends boolean ? true | false :
  F extends Array<infer U> ? U | U[] : {
    [K in keyof F]?: Filter<F[K] & Value>
  }
