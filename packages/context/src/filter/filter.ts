import { Value, ValueObject } from '../value';

export type Filter<Filterable extends Value> = 
  Filterable extends number ? number | number[] :
  Filterable extends bigint ? bigint | bigint[] :
  Filterable extends string ? string | string[] :
  Filterable extends boolean ? boolean | boolean[] :
  Filterable extends Date ? Date | Date[] :
  Filterable extends Array<infer U> ? U | U[] :
  Filterable extends ValueObject ? { 
    [K in keyof Filterable]?: Filter<Filterable[K]> 
  } : never