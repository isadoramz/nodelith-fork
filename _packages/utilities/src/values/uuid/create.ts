import { randomUUID } from 'crypto';
import { Uuid } from './types'

export function create(separator = ''): Uuid {
  return randomUUID().replace(/-/gi, separator)
}