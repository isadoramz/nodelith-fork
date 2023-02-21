export type Range<T = any> = {
  start?: T
  end?: T
} & ({
  start: T
} | {
  end: T
})
