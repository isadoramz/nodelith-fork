import { Time, TimeOffset } from './types'

export function offset(offsetValue: Time): TimeOffset {
    const currentTime = Date.now()
    const offsetTime = offsetValue + currentTime
    return [currentTime, offsetTime]
  }
  