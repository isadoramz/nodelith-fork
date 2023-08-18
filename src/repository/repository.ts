import { Entity } from '../entity'
import { CrudRepository } from './crud-repository';
// import { FilterRepository } from './filter-repository';
// import { QueryRepository } from './query-repository'

export interface Repository<E extends Entity<any>> extends 
  // QueryRepository<E>,
  // FilterRepository<E>,
  CrudRepository<E> {}