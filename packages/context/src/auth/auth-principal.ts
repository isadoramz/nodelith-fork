import { Value } from '../value'

export type AuthPrincipal = Record<string, Value> & {
  type: string
}