import { Identifier } from './identifier'

export type Identifiable<I extends Identifier = string> = {
  id: I
}