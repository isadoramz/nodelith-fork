import { Url } from './types'
import * as Path from 'path'

export function create(baseUrl: string, path: string, query: Record<string, string> = {}): Url {
  return Object.entries(query).reduce((url: URL, queryEntry: [string, string]) => {
    url.searchParams.append(queryEntry[0], queryEntry[1])
    return url
  }, new URL(Path.join(baseUrl, path))).toString()
}