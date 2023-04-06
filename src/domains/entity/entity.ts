
import { Identifiable, Identifier } from '../identifiable'
import { ValueObject } from '../value'

export type Entity<I extends Identifier = string> =  Identifiable<I> & ValueObject & {
  createdAt: Date,
  updatedAt: Date,
}
